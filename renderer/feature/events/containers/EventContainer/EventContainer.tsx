import { App, Button, Card, Flex, Tabs, Typography } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import { FireOutlined } from '@ant-design/icons'

import { Standing } from '@prisma/client'
import { playoff } from '../../../../shared/utils/sports-draw'
import { GameCompetitionWithCategoryAndAthletes } from '../../../../types/GameCompetitionWithCategoryAndAthletes'
import { GameWithAll } from '../../../../types/GameWithAll'
import { StandingWithDuel } from '../../../../types/StandingWithDuel'

interface IGameFormProps {
  gameId?: number
}

export const EventContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props

  const { notification } = App.useApp()
  const [game, setGame] = useState<GameWithAll>()
  const [gameCompetitions, setGameCompetitions] = useState<GameCompetitionWithCategoryAndAthletes[]>([])

  const fetchData = async () => {
    const tasks = [
      async () => {
        if (gameId) {
          const resGame = await fetch(`/api/games/${gameId}`)
          const game: GameWithAll = await resGame.json()
          setGame(game)
        }
      },
      async () => {
        if (gameId) {
          const resGameCompetitions = await fetch(`/api/game-competition/${gameId}`)
          const gameCompetition: GameCompetitionWithCategoryAndAthletes[] = await resGameCompetitions.json()
          setGameCompetitions(gameCompetition)
        }
      },
    ]
    await Promise.all(tasks.map((p) => p()))
  }

  const getActions = (duelId: number) => {
    return [
      <Link key="start" href={`/events/duel/${duelId}`}>
        <Button type="primary">
          <FireOutlined />
          Начать поединок
        </Button>
      </Link>,
    ]
  }

  const getStandings = (categoryId: number, standings: StandingWithDuel[]) =>
    standings.map((standing) => {
      // Проверка закончился ли текущий круг
      const duelsCount = standing?.duels?.length
      const winners = standing?.duels?.filter((duel) => duel.winnerId).map((duel) => duel.winnerId)

      return (
        <Card key={standing?.id}>
          {!standing.close && duelsCount && winners && duelsCount === winners.length ? (
            <Button
              type="primary"
              onClick={() => {
                newStanding(categoryId, standing, winners)
              }}
            >
              Следующий круг
            </Button>
          ) : null}
          {standing?.duels?.map((duel) => (
            <Card
              key={duel?.id}
              actions={!duel.winnerId && duel.firstPlayerId && duel.secondPlayerId && getActions(duel.id)}
            >
              <Card key={duel.firstPlayerId}>
                <Typography.Text
                  type={duel.winnerId === duel.firstPlayer.id || !duel.secondPlayerId ? 'success' : 'secondary'}
                >
                  {duel.firstPlayer.firstName} {duel.firstPlayer.lastName} {duel.firstPlayer.team?.name}{' '}
                  {duel.firstPlayer.team?.city?.city}
                </Typography.Text>
              </Card>
              {duel.secondPlayerId ? (
                <Card key={duel.secondPlayerId}>
                  <Typography.Text type={duel.winnerId === duel.secondPlayer.id ? 'success' : 'secondary'}>
                    {duel.secondPlayer?.firstName} {duel.secondPlayer?.lastName} {duel.secondPlayer?.team?.name}{' '}
                    {duel.secondPlayer?.team?.city?.city}
                  </Typography.Text>
                </Card>
              ) : null}
            </Card>
          ))}
        </Card>
      )
    })

  const items = []

  const newStanding = async (gameCategoryId: number, standing: Standing, athletes: number[]) => {
    let duels = playoff(athletes)
    const newStanding = {
      gameCategoryId: gameCategoryId,
      duels,
    }
    try {
      await fetch(`/api/game-standings/${standing.id}`, {
        body: JSON.stringify(newStanding),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      })

      standing.close = true

      await fetchData()

      notification.success({
        message: `Сохранение`,
        description: 'Турнирная таблица обновлена',
      })
    } catch (error) {
      notification.error({
        message: `Сохранение`,
        description: 'При сохранении произошла ошибка.',
      })
    }
  }

  gameCompetitions?.forEach((competition) => {
    competition?.categories.forEach((category) => {
      if (!category?.standings?.length) {
        return
      }

      items.push({
        key: competition.competitionId + ': ' + category.categoryId,
        label: competition.competition.name + ': ' + category.category.name,
        children: <Flex> {getStandings(category.id, category?.standings as StandingWithDuel[])}</Flex>,
      })
    })
  })

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h1>Соревнование: {game?.name}</h1>
      <h2>
        {dayjs(game?.startDate).format('DD.MM.YYYY')} - {dayjs(game?.endDate).format('DD.MM.YYYY')}
      </h2>

      <Tabs defaultActiveKey="1" items={items} />
    </>
  )
}
