import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { GameFormContainer } from '../../../feature/games/containers/GameFormContainer/GameFormContainer'

const GameEdit: NextPage = () => {
  const router = useRouter()
  const { query } = router

  return (
    <>
      <h1>Редактирование соревнования</h1>
      <GameFormContainer gameId={query?.id?.toString()} />
    </>
  )
}

export default GameEdit
