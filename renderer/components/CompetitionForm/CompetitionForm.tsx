import { Button, Form, Input } from 'antd'
import { FC, useEffect } from 'react'

import { ICompetition } from '../../types/ICompetition'

type FieldType = {
  id?: string
  name?: string
}

interface ICompetitionFormProps {
  competition?: ICompetition
  onFinish: (values: any) => void
}

export const CompetitionForm: FC<ICompetitionFormProps> = (props) => {
  const { competition, onFinish } = props

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      id: competition?.id,
      name: competition?.name,
    })
  }, [form, competition])

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item<FieldType> name="id" hidden={true}>
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Название дисциплины"
        name="name"
        rules={[{ required: true, message: 'Введите название дисциплины' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}
