import { FC } from 'react'

import { TeamForm } from '../../components/TeamForm/TeamForm'
import cities from '../../data/city.json'
import { saveData } from '../../utils/file'

interface TeamFormProps {
  id?: string
  name?: string
  city?: string
}

export const TeamFormContainer: FC<TeamFormProps> = (props) => {
  const { id, name, city } = props

  const onFinish = (values: any) => {
    saveData(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <TeamForm id={id} name={name} city={city} cities={cities} onFinish={onFinish} onFinishFailed={onFinishFailed} />
  )
}
