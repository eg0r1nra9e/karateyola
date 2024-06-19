import { NextPage } from 'next'

import { AthleteFormContainer } from '../../../feature/athletes/containers/AthleteFormContainer/AthleteFormContainer'

const AthleteAdd: NextPage = () => {
  return (
    <>
      <h1>Добавление спортсмена</h1>
      <AthleteFormContainer />
    </>
  )
}

export default AthleteAdd
