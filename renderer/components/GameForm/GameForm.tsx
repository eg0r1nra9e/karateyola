import { Button, DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import React, { FC, useEffect } from 'react'

import { IGame } from '../../types/IGame'

type FieldType = IGame

interface IGameFormProps {
  game?: IGame
  onFinish: (values: any) => void
}

const dateFormat = 'DD.MM.YYYY'

export const GameForm: FC<IGameFormProps> = (props) => {
  const { game, onFinish } = props

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      id: game?.id,
      name: game?.name,
      firstDate: dayjs(game?.firstDate),
      lastDate: dayjs(game?.lastDate),
    })
  }, [form, game])

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
      <Form.Item<FieldType> label="Название" name="name" rules={[{ required: true, message: 'Введите название' }]}>
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Дата начала"
        name="firstDate"
        rules={[{ required: true, message: 'Введите дату начала соревнований' }]}
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Дата окончания"
        name="lastDate"
        rules={[{ required: true, message: 'Введите дату окончания соревнований' }]}
      >
        <DatePicker format={dateFormat} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}
