import { FC } from 'react'
import { GameForm } from '../../components/GameForm/GameForm'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addGame, editGame, selectGame } from '../../store/slices/gamesSlice'

interface IGameFormProps {
  gameId?: string
}

export const GameFormContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  const game = useAppSelector((state) => selectGame(state, gameId))

  const onFinish = (team: any) => {
    if (!gameId) {
      dispatch(addGame(team))
    } else {
      dispatch(editGame(team))
    }

    push('/games/')
  }

  return <GameForm game={game} onFinish={onFinish} />
}
