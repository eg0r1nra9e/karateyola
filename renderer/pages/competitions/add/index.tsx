import { NextPage } from 'next'

import { CompetitionFormContainer } from '../../../feature/competitions/containers/CompetitionFormContainer/CompetitionFormContainer'

const CompetitionAdd: NextPage = () => {
  return (
    <>
      <h1>Добавление дисциплины</h1>
      <CompetitionFormContainer />
    </>
  )
}

export default CompetitionAdd
