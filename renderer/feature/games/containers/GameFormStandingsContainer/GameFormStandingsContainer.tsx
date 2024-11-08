import { App, Button, Divider, Space, Tabs } from 'antd'
import { FC, useEffect, useState } from 'react'
import { playoff } from '../../../../shared/utils/sports-draw'

import { GameCompetitionWithCategoryAndAthletes } from '../../../../types/GameCompetitionWithCategoryAndAthletes'
import { StandingWithDuel } from '../../../../types/StandingWithDuel'
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
        children: <GameDuelsComponent standings={gameCategory.standings as StandingWithDuel[]} />,
      })
    })
  })

  const updateStandings = async () => {
    const standings: any[] = []

    gameCompetitions?.forEach((gameCompetition) => {
      gameCompetition?.categories.forEach((gameCategory) => {
        const athletes = gameCategory?.athletes.map((athlete) => athlete.athleteId)
        let duels = playoff(athletes)

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

      await fetchData()

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
