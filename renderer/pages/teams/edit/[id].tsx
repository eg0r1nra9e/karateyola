import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { TeamFormContainer } from '../../../feature/teams/containers/TeamFormContainer/TeamFormContainer'

const TeamEdit: NextPage = () => {
  const router = useRouter()
  const { query } = router

  return (
    <>
      <h1>Редактирование команды</h1>
      <TeamFormContainer teamId={query?.id?.toString()} />
    </>
  )
}

export default TeamEdit
