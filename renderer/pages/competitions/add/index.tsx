import { NextPage } from 'next'

import { CompetitionFormContainer } from '../../../containers/CompetitionFormContainer/CompetitionFormContainer'

const CompetitionAdd: NextPage = () => {
  return (
    <>
      <h1>Добавление дисциплины</h1>
      <CompetitionFormContainer />
    </>
  )
}

export default CompetitionAdd
