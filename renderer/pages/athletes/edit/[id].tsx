import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { AthleteFormContainer } from '../../../feature/athletes/containers/AthleteFormContainer/AthleteFormContainer'

const AthleteEdit: NextPage = () => {
  const router = useRouter()
  const { query } = router

  return (
    <>
      <h1>Редактирование спортсмена</h1>
      <AthleteFormContainer athleteId={query?.id?.toString()} />
    </>
  )
}

export default AthleteEdit
