import { useRouter } from 'next/router'
import { FC } from 'react'

import { AthleteForm } from '../../components/AthleteForm/AthleteForm'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addAthlete, editAthlete, selectAthlete } from '../../store/slices/athletesSlice'
import { selectTeams } from '../../store/slices/teamsSlice'
import { IAthlete } from '../../types/IAthlete'

interface IAthleteFormProps {
  athleteId?: string
}

export const AthleteFormContainer: FC<IAthleteFormProps> = (props) => {
  const { athleteId } = props
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  const athlete = useAppSelector((state) => selectAthlete(state, athleteId))

  const teams = useAppSelector(selectTeams)

  const onFinish = (athlete: IAthlete) => {
    for (const [key, value] of Object.entries(athlete)) {
      if (value && value.toDate && typeof value.toDate == 'function') {
        athlete[key] = value.toDate().toString();
      }
    }
    if (!athleteId) {
      dispatch(addAthlete(athlete))
    } else {
      dispatch(editAthlete(athlete))
    }

    push('/athletes/')
  }

  return <AthleteForm athlete={athlete} teams={teams} onFinish={onFinish} />
}
