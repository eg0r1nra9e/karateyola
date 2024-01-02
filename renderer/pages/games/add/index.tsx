import { NextPage } from 'next'
import { GameForm } from '../../../components/GameForm/GameForm'
import { GameFormContainer } from '../../../containers/GameFormContainer/GameFormContainer'

const GameAdd: NextPage = () => {
  return (
    <>
      <h1>Добавление соревнования</h1>
      <GameFormContainer />
    </>
  )
}

export default GameAdd
