import { App, Button, Divider, Space, Tabs } from 'antd'
import { chunk, shuffle, uniq } from 'lodash'
import { FC, useEffect, useState } from 'react'

import { Duel } from '@prisma/client'
import { GameCompetitionWithCategoryAndAthletes } from '../../../../types/GameCompetitionWithCategoryAndAthletes'
import { GameDuelsComponent } from '../../components/GameDuelsComponent/GameDuelsComponent'

interface IGameFormStandingsContainerProps {
  gameId?: number
}

export const GameFormStandingsContainer: FC<IGameFormStandingsContainerProps> = (props) => {
  const { gameId } = props

  const { notification } = App.useApp()

  const [gameCompetitions, setGameCompetitions] = useState<GameCompetitionWithCategoryAndAthletes[]>([])

  const fetchData = async () => {
    const tasks = [
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

  const items = []

  gameCompetitions?.forEach((gameCompetition) => {
    gameCompetition?.categories.forEach((gameCategory) => {
      items.push({
        key: gameCategory.id,
        label: gameCompetition.competition.name + ': ' + gameCategory.category.name,
        children: <GameDuelsComponent standings={gameCategory.standings} />,
      })
    })
  })

  const updateStandings = async () => {
    const standings: any[] = []

    gameCompetitions?.forEach((gameCompetition) => {
      gameCompetition?.categories.forEach((gameCategory) => {
        const athletes = gameCategory?.athletes.map((athlete) => athlete.athleteId)
        const randomDuels = [...chunk(shuffle(uniq(athletes)), 2)]
        let duels: Duel[] = randomDuels.map(
          (duel) =>
            ({
              onePlayerId: duel[0],
              twoPlayerId: duel[1] ?? null,
            }) as Duel,
        )

        standings.push({
          gameCategoryId: gameCategory.id,
          duels,
        })
      })
    })

    try {
      await fetch(`/api/game-standings/create`, {
        body: JSON.stringify(standings),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      fetchData()

      notification.success({
        message: `Сохранение`,
        description: 'Турнирная таблица сохранена',
      })
    } catch (error) {
      notification.error({
        message: `Сохранение`,
        description: 'При сохранении произошла ошибка.',
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
      <Divider />
      <Space size={8}>
        <Button type="primary" htmlType="submit" onClick={() => updateStandings()}>
          Обновить турнирную таблицу
        </Button>
      </Space>
    </>
  )
}
