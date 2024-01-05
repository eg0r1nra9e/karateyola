import { useRouter } from 'next/router'
import { FC } from 'react'

import { TeamForm } from '../../components/TeamForm/TeamForm'
import cities from '../../data/city.json'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addTeam, editTeam, selectTeam } from '../../store/slices/teamsSlice'

interface ITeamFormProps {
  teamId?: string
}

export const TeamFormContainer: FC<ITeamFormProps> = (props) => {
  const { teamId } = props
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  const team = useAppSelector((state) => selectTeam(state, teamId))

  const onFinish = (team: any) => {
    if (!teamId) {
      dispatch(addTeam(team))
    } else {
      dispatch(editTeam(team))
    }

    push('/teams/')
  }

  return <TeamForm team={team} cities={cities} onFinish={onFinish} />
}
