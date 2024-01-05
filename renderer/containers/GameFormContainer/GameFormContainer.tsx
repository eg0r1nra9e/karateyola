import { useRouter } from 'next/router'
import { FC } from 'react'

import { GameForm } from '../../components/GameForm/GameForm'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectAthletes } from '../../store/slices/athletesSlice'
import { selectCompetitions } from '../../store/slices/competitionsSlice'
import { addGame, editGame, selectGame } from '../../store/slices/gamesSlice'

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

  const onFinish = (game: any) => {
    if (!gameId) {
      dispatch(addGame(game))
    } else {
      dispatch(editGame(game))
    }

    push('/games/')
  }

  return <GameForm game={game} competitions={competitions} athletes={athletes} onFinish={onFinish} />
}
