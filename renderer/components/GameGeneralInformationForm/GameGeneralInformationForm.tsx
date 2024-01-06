import { Button, DatePicker, Divider, Form, Input, Radio } from 'antd'
import dayjs from 'dayjs'
import React, { FC, useEffect } from 'react'

import { IGame } from '../../types/IGame'

const { RangePicker } = DatePicker

type FieldType = IGame

interface IGameGeneralInformationFormProps {
  game?: IGame
  onFinish: (values: any) => void
}
const dateFormat = 'DD.MM.YYYY'

export const GameGeneralInformationForm: FC<IGameGeneralInformationFormProps> = (props) => {
  const { game, onFinish } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      id: game?.id,
      name: game?.name,
      dates: [dayjs(game?.dates[0]), dayjs(game?.dates[1])],
      status: game?.status,
    })
  }, [form, game])

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
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
        label="Даты проведения"
        name="dates"
        rules={[{ required: true, message: 'Введите даты проведения' }]}
      >
        <RangePicker format={dateFormat} />
      </Form.Item>

      <Form.Item<FieldType> label="Статус" name="status" rules={[{ required: true, message: 'Выберите статус' }]}>
        <Radio.Group>
          <Radio value="ожидает начала"> Ожидает начала </Radio>
          <Radio value="идет"> Идет </Radio>
          <Radio value="закончено"> Закончено </Radio>
        </Radio.Group>
      </Form.Item>
      <Divider />
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Продолжить
        </Button>
      </Form.Item>
    </Form>
  )
}
