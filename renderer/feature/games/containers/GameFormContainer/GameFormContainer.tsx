import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { Category, Competition, Team } from '@prisma/client'

import { AthleteWithTeamAndCity } from '../../../../types/AthleteWithTeamAndCity'
import { GameCompetitionWithCategoryAndAthletes } from '../../../../types/GameCompetitionWithCategoryAndAthletes'
import { GameWithAll } from '../../../../types/GameWithAll'
import { GameForm } from '../../components/GameForm/GameForm'

interface IGameFormProps {
  gameId?: string
}

export const GameFormContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props
  const { push } = useRouter()

  const [game, setGame] = useState<GameWithAll>()
  const [competitions, setCompetitions] = useState<Competition[]>()
  const [categories, setCategories] = useState<Category[]>()
  const [athletes, setAthletes] = useState<AthleteWithTeamAndCity[]>()
  const [teams, setTeams] = useState<Team[]>()
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
        const resAthletes = await fetch('/api/athletes')
        const athletes: AthleteWithTeamAndCity[] = await resAthletes.json()
        setAthletes(athletes)
      },
      async () => {
        const resTeams = await fetch('/api/teams')
        const teams: Team[] = await resTeams.json()
        setTeams(teams)
      },
      async () => {
        if (gameId) {
          const resGame = await fetch(`/api/games/${gameId}`)
          const game: GameWithAll = await resGame.json()
          setGame(game)
        }
      },
      async () => {
        if (gameId) {
          const resGame = await fetch(`/api/game-competition/${gameId}`)
          const gameCompetitions: GameCompetitionWithCategoryAndAthletes[] = await resGame.json()
          setGameCompetitions(gameCompetitions)
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
      gameId={+gameId}
      game={game}
      gameCompetitions={gameCompetitions}
      competitions={competitions}
      categories={categories}
      athletes={athletes}
      onSave={onFinish}
      onFinish={() => push('/games/')}
    />
  )
}
