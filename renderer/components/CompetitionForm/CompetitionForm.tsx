import { Button, Form, Input } from 'antd'
import { FC } from 'react'

type FieldType = {
  name?: string
}

interface ICompetitionFormProps {
  id?: string
  name?: string
}

export const CompetitionForm: FC<ICompetitionFormProps> = (props) => {
  const { id, name } = props

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Название дисциплины"
        name="name"
        rules={[{ required: true, message: 'Введите название дисциплины' }]}
      >
        <Input defaultValue={name} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}
