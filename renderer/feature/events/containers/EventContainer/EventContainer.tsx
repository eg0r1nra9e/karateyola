import { App, Button, Card, Flex, Tabs } from 'antd'
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

  const getStandings = (standings: StandingWithDuel[]) =>
    standings.map((standing) => {
      return (
        <Card key={standing?.id}>
          {standing?.duels?.map((duel) => (
            <Card
              key={duel?.id}
              actions={!duel.winnerId && duel.firstPlayerId && duel.secondPlayerId && getActions(duel.id)}
            >
              <Card key={duel.firstPlayerId}>
                {duel.firstPlayer.firstName} {duel.firstPlayer.lastName} {duel.firstPlayer.team?.name}{' '}
                {duel.firstPlayer.team?.city?.city}
              </Card>
              {duel.secondPlayerId ? (
                <Card key={duel.secondPlayerId}>
                  {duel.secondPlayer?.firstName} {duel.secondPlayer?.lastName} {duel.secondPlayer?.team?.name}{' '}
                  {duel.secondPlayer?.team?.city?.city}
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

      category?.standings.forEach(async (standing) => {
        if (standing.close) {
          return
        }

        // Проверка закончился ли текущий круг
        const duelsCount = standing?.duels?.length
        const winners = standing?.duels?.filter((duel) => duel.winnerId).map((duel) => duel.winnerId)

        if (duelsCount && winners && duelsCount === winners.length) {
          await newStanding(category.id, standing, winners)
        }
      })

      items.push({
        key: competition.competitionId + ': ' + category.categoryId,
        label: competition.competition.name + ': ' + category.category.name,
        children: <Flex> {getStandings(category?.standings as StandingWithDuel[])}</Flex>,
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
