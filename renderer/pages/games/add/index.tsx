import { NextPage } from 'next'

import { GameFormContainer } from '../../../feature/games/containers/GameFormContainer/GameFormContainer'

const GameAdd: NextPage = () => {
  return (
    <>
      <h1>Добавление соревнования</h1>
      <GameFormContainer />
    </>
  )
}

export default GameAdd
