import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { Athlete, Category, Competition } from '@prisma/client'
import dayjs from 'dayjs'
import { GameForm } from '../../components/GameForm/GameForm'
import { GameWithAll } from '../../types/GameWithAll'

interface IGameFormProps {
  gameId?: string
}

export const GameFormContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props
  const { push } = useRouter()

  const [game, setGame] = useState<GameWithAll>()
  const [competitions, setCompetitions] = useState<Competition[]>()
  const [categories, setCategories] = useState<Category[]>()
  const [athletes, setAthletes] = useState<Athlete[]>()

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
        const resAthletes = await fetch('/api/athletes')
        const athletes: Athlete[] = await resAthletes.json()
        setAthletes(athletes)
      },

      async () => {
        if (gameId) {
          const resGame = await fetch(`/api/games/${gameId}`)
          const game: GameWithAll = await resGame.json()
          setGame(game)
        }
      },
    ]
    await Promise.all(tasks.map((p) => p()))
  }

  const onFinish = async (game: GameWithAll & { dates: dayjs.Dayjs[] }) => {
    const newGame = {
      ...game,
      startDate: game.dates[0],
      endDate: game.dates[1],
    }
    if (!gameId) {
      await fetch('/api/games/create', {
        body: JSON.stringify(newGame),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    } else {
      await fetch(`/api/games/${gameId}`, {
        body: JSON.stringify(newGame),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      })
    }

    push('/games/')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <GameForm
      game={game}
      competitions={competitions}
      categories={categories}
      athletes={athletes}
      onSave={onFinish}
      onFinish={() => push('/games/')}
    />
  )
}
