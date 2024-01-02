import { FC } from 'react'
import { CompetitionForm } from '../../components/CompetitionForm/CompetitionForm'

type FieldType = {
  name?: string
}

interface ICompetitionFormProps {
  id?: string
  name?: string
}

export const CompetitionFormContainer: FC<ICompetitionFormProps> = (props) => {
  const { id, name } = props

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return <CompetitionForm id={id} name={name} onFinish={onFinish} onFinishFailed={onFinishFailed} />
}
