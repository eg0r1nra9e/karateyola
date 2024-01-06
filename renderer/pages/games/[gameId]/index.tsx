import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { GameContainer } from '../../../containers/GameContainer/GameContainer'

const GameEdit: NextPage = () => {
  const router = useRouter()
  const { query } = router

  return <GameContainer gameId={query?.gameId?.toString()} />
}

export default GameEdit
