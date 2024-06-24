import { App } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { Game } from '@prisma/client'

import { GameWithAll } from '../../../../types/GameWithAll'
import { GameGeneralInformationForm } from '../../components/GameGeneralInformationForm/GameGeneralInformationForm'

interface IGameFormProps {
  gameId?: number
}

export const GameGeneralInformationFormContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props

  const { push } = useRouter()
  const [game, setGame] = useState<GameWithAll>()
  const { notification } = App.useApp()

  const fetchData = async () => {
    const tasks = [
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

    let currentGame: Game

    try {
      if (!gameId) {
        const result = await fetch('/api/games/create', {
          body: JSON.stringify(newGame),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        currentGame = await result.json()

        push(`/games/edit/${currentGame.id}`)
      } else {
        const result = await fetch(`/api/games/${gameId}`, {
          body: JSON.stringify(newGame),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        })

        currentGame = await result.json()
      }

      notification.success({
        message: `Сохранение`,
        description: 'Общая информация сохранена',
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
      <GameGeneralInformationForm game={game} onFinish={onFinish}></GameGeneralInformationForm>
    </>
  )
}
