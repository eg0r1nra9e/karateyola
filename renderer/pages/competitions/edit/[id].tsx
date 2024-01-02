import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { CompetitionForm } from '../../../components/CompetitionForm/CompetitionForm'

const CompetitionEdit: NextPage = () => {
  const router = useRouter()
  const { query } = router

  return (
    <>
      <h1>Редактирование дисциплины с id {query?.id}</h1>
      <CompetitionForm name={query?.id as string} />
    </>
  )
}

export default CompetitionEdit
