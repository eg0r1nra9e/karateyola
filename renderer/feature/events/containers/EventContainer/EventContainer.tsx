import { Button, Card, Flex, Tabs } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import { FireOutlined } from '@ant-design/icons'

import { GameCompetitionWithCategoryAndAthletes } from '../../../../types/GameCompetitionWithCategoryAndAthletes'
import { GameWithAll } from '../../../../types/GameWithAll'
import { StandingWithDuel } from '../../../../types/StandingWithDuel'

interface IGameFormProps {
  gameId?: number
}

export const EventContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props

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
    standings.map((standing) => (
      <Card key={standing?.id}>
        {standing?.duels?.map((duel) => (
          <Card key={duel?.id} actions={!duel.winnerId && getActions(duel.id)}>
            <Card key={duel.onePlayerId}>
              {duel.onePlayer.firstName} {duel.onePlayer.lastName} {duel.onePlayer.team?.name}{' '}
              {duel.onePlayer.team?.city?.city}
            </Card>
            <Card key={duel.twoPlayerId}>
              {duel.twoPlayer?.firstName} {duel.twoPlayer?.lastName} {duel.twoPlayer?.team?.name}{' '}
              {duel.twoPlayer?.team?.city?.city}
            </Card>
          </Card>
        ))}
      </Card>
    ))

  const items = []

  gameCompetitions.forEach((competition) => {
    competition?.categories.forEach((category) => {
      if (!category?.standings?.length) {
        return
      }
      items.push({
        key: competition.competitionId + ': ' + category.categoryId,
        label: competition.competition.name + ': ' + category.category.name,
        children: <Flex> {getStandings(category.standings)}</Flex>,
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
