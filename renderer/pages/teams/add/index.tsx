import { NextPage } from 'next'

import { TeamFormContainer } from '../../../containers/TeamFormContainer/TeamFormContainer'

const TeamAdd: NextPage = () => {
  return (
    <>
      <h1>Добавление команды</h1>
      <TeamFormContainer />
    </>
  )
}

export default TeamAdd
