import { useRouter } from 'next/router'
import { FC } from 'react'

import { CompetitionForm } from '../../components/CompetitionForm/CompetitionForm'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addCompetition, editCompetition, selectCompetition } from '../../store/slices/competitionsSlice'

interface ICompetitionFormProps {
  competitionId?: string
  name?: string
}

export const CompetitionFormContainer: FC<ICompetitionFormProps> = (props) => {
  const { competitionId } = props

  const { push } = useRouter()

  const dispatch = useAppDispatch()

  const competition = useAppSelector((state) => selectCompetition(state, competitionId))

  const onFinish = (competition: any) => {
    if (!competitionId) {
      dispatch(addCompetition(competition))
    } else {
      dispatch(editCompetition(competition))
    }

    push('/competitions/')
  }

  return <CompetitionForm competition={competition} onFinish={onFinish} />
}
