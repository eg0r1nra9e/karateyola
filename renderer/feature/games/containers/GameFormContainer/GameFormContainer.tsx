import { FC } from 'react'

import { GameForm } from '../../components/GameForm/GameForm'

interface IGameFormProps {
  gameId?: string
}

export const GameFormContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props

  return <GameForm gameId={+gameId} />
}
