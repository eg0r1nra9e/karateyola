import { FC } from 'react'
import { GameForm } from '../../components/GameForm/GameForm'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addGame, editGame, selectGame } from '../../store/slices/gamesSlice'
import { selectCompetitions } from '../../store/slices/competitionsSlice'

interface IGameFormProps {
  gameId?: string
}

export const GameFormContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  const game = useAppSelector((state) => selectGame(state, gameId))
  const competitions = useAppSelector(selectCompetitions)

  const onFinish = (game: any) => {
    if (!gameId) {
      dispatch(addGame(game))
    } else {
      dispatch(editGame(game))
    }

    push('/games/')
  }

  return <GameForm game={game} competitions={competitions} onFinish={onFinish} />
}
