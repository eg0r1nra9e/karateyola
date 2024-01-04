import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { CompetitionFormContainer } from '../../../containers/CompetitionFormContainer/CompetitionFormContainer'

const CompetitionEdit: NextPage = () => {
  const router = useRouter()
  const { query } = router

  return (
    <>
      <h1>Редактирование дисциплины</h1>
      <CompetitionFormContainer competitionId={query?.id?.toString()} />
    </>
  )
}

export default CompetitionEdit
