import { Button, Form, Input } from 'antd'
import React, { FC } from 'react'
import type { DatePickerProps } from 'antd'
import { DatePicker, Space } from 'antd'
import type { FormItemProps } from 'antd'

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

export const GameForm: FC<IGameFormProps> = (props) => {
  const { id, gameName, firstDate, onFinish, onFinishFailed } = props
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
      <Form.Item<FieldType> label="Название" name="gameName" rules={[{ required: true, message: 'Введите название' }]}>
        <Input defaultValue={name} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Дата начала"
        name="firstDate"
        rules={[{ required: true, message: 'Введите дату начала соревнований' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item<FieldType>
        label="Дата окончания"
        name="lastDate"
        rules={[{ required: true, message: 'Введите дату окончания соревнований' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}
