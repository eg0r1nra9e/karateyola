import { App, Button, Divider, Space, Tabs } from 'antd'
import { FC, useEffect, useState } from 'react'

import { GameAthlete } from '@prisma/client'
import { AthleteWithTeamAndCity } from '../../../../types/AthleteWithTeamAndCity'
import { GameCompetitionWithCategoryAndAthletes } from '../../../../types/GameCompetitionWithCategoryAndAthletes'
import { GameAthletesTable } from '../../components/GameAthletesTable/GameAthletesTable'

interface IGameAthletesFormContainerProps {
  gameId?: number
}

export const GameAthletesFormContainer: FC<IGameAthletesFormContainerProps> = (props) => {
  const { gameId } = props

  const { notification } = App.useApp()

  const [gameCompetitions, setGameCompetitions] = useState<GameCompetitionWithCategoryAndAthletes[]>([])
  const [athletes, setAthletes] = useState<AthleteWithTeamAndCity[]>()

  const fetchData = async () => {
    const tasks = [
      async () => {
        if (gameId) {
          const resGameCompetitions = await fetch(`/api/game-competition/${gameId}`)
          const gameCompetition: GameCompetitionWithCategoryAndAthletes[] = await resGameCompetitions.json()
          setGameCompetitions(gameCompetition)
        }
      },
      async () => {
        const resAthletes = await fetch('/api/athletes')
        const athletes: AthleteWithTeamAndCity[] = await resAthletes.json()
        setAthletes(athletes)
      },
    ]
    await Promise.all(tasks.map((p) => p()))
  }

  const items = []

  const onChange = (gameCompetitionId: number, gameCategoryId: number, athletesIds: number[]) => {
    const currentGameCompetitions = [...gameCompetitions]
    const gameCompetition = currentGameCompetitions.find((competition) => competition.id === gameCompetitionId)
    const gameCategory = gameCompetition.categories.find((category) => category.id === gameCategoryId)
    gameCategory.athletes = athletesIds.map(
      (athlete) =>
        ({
          athleteId: athlete,
        }) as GameAthlete,
    )

    setGameCompetitions([...currentGameCompetitions])
  }

  gameCompetitions?.forEach((gameCompetition) => {
    if (gameCompetition?.categories?.length) {
      gameCompetition?.categories.forEach((gameCategory) => {
        items.push({
          key: gameCategory.id,
          label: gameCompetition.competition.name + ': ' + gameCategory.category.name,
          children: (
            <GameAthletesTable
              gameCompetitionId={gameCompetition.id}
              gameCategoryId={gameCategory.id}
              gameAthletes={gameCategory.athletes}
              athletes={athletes}
              onChange={onChange}
            />
          ),
        })
      })
    }
  })

  const onFinish = async () => {
    const currentGameAthletes: GameAthlete[] = []

    gameCompetitions.forEach((gameCompetition) => {
      gameCompetition.categories.forEach((gameCategory) => {
        gameCategory.athletes.map((athlete) => {
          currentGameAthletes.push({
            categoryId: gameCategory.id,
            athleteId: athlete.athleteId,
          } as GameAthlete)
        })
      })
    })

    try {
      const result = await fetch('/api/game-athletes/create', {
        body: JSON.stringify(currentGameAthletes),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      notification.success({
        message: `Сохранение`,
        description: 'Спортсмены сохранены',
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
      <Tabs defaultActiveKey="1" items={items} indicator={{ size: (origin) => origin - 16 }} />
      <Divider />
      <Space size={8}>
        <Button type="primary" htmlType="submit" onClick={() => onFinish()}>
          Сохранить
        </Button>
      </Space>
    </>
  )
}
