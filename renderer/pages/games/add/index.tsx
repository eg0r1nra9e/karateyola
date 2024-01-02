import { NextPage } from 'next'
import { GameForm } from '../../../components/GameForm/GameForm'

const GameAdd: NextPage = () => {
  return (
    <>
      <h1>Добавление соревнования</h1>

      <GameForm />
    </>
  )
}

export default GameAdd
