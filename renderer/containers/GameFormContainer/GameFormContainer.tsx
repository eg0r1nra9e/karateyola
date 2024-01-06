import { useRouter } from 'next/router'
import { FC } from 'react'

import { GameForm } from '../../components/GameForm/GameForm'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectAthletes } from '../../store/slices/athletesSlice'
import { selectCompetitions } from '../../store/slices/competitionsSlice'
import { addGame, editGame, selectGame } from '../../store/slices/gamesSlice'
import { IGame } from '../../types/IGame'

interface IGameFormProps {
  gameId?: string
}

export const GameFormContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  const game = useAppSelector((state) => selectGame(state, gameId))
  const competitions = useAppSelector(selectCompetitions)
  const athletes = useAppSelector(selectAthletes)

  const onFinish = (game: IGame) => {
    if (!gameId) {
      dispatch(addGame(game))
    } else {
      dispatch(editGame(game))
    }
  }

  return (
    <GameForm
      game={game}
      competitions={competitions}
      athletes={athletes}
      onSave={onFinish}
      onFinish={() => push('/games/')}
    />
  )
}
