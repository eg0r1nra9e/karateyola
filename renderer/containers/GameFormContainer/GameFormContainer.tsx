import { FC } from 'react'
import { GameForm } from '../../components/GameForm/GameForm'

type FieldType = {
  gameName?: string
  firstDate?: string
  lastDate?: string
}

interface IGameFormProps {
  id?: string
  gameName?: string
  firstDate?: string
  lastDate?: string
  onFinish: (values: any) => void
  onFinishFailed: (values: any) => void
}

export const GameFormContainer: FC<IGameFormProps> = (props) => {
  const { id, gameName, firstDate, lastDate } = props

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <GameForm
      id={id}
      gameName={gameName}
      firstDate={firstDate}
      lastDate={lastDate}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  )
}
