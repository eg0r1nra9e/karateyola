import { App } from 'antd'
import { FC, useEffect, useState } from 'react'

import { Category, Competition } from '@prisma/client'

import { GameCompetitionWithCategoryAndAthletes } from '../../../../types/GameCompetitionWithCategoryAndAthletes'
import { GameWithAll } from '../../../../types/GameWithAll'
import { GameCompetitionsForm } from '../../components/GameCompetitionsForm/GameCompetitionsForm'

interface IGameFormProps {
  gameId?: number
}

export const GameCompetitionsFormContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props

  const { notification } = App.useApp()

  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [gameCompetitions, setGameCompetitions] = useState<GameCompetitionWithCategoryAndAthletes[]>([])

  const fetchData = async () => {
    const tasks = [
      async () => {
        const resCompetitions = await fetch('/api/competitions')
        const competitions: Competition[] = await resCompetitions.json()
        setCompetitions(competitions)
      },
      async () => {
        const resCategories = await fetch('/api/categories')
        const categories: Category[] = await resCategories.json()
        setCategories(categories)
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

  const onFinish = async (game: GameWithAll) => {
    try {
      await fetch(`/api/game-competition/${gameId}`, {
        body: JSON.stringify(game.competitions),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      fetchData()

      notification.success({
        message: `Сохранение`,
        description: 'Дисциплины и категории сохранены',
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

  if (!gameId) {
    return null
  }

  return (
    <>
      <GameCompetitionsForm
        gameCompetitions={gameCompetitions}
        competitions={competitions}
        categories={categories}
        onFinish={onFinish}
      ></GameCompetitionsForm>
    </>
  )
}
