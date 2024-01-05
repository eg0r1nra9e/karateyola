import { Button, DatePicker, Form, Input, Radio, Select, Space } from 'antd'
import dayjs from 'dayjs'
import React, { FC, useEffect } from 'react'

import { IGame } from '../../types/IGame'
import { ICompetition } from '../../types/ICompetition'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

type FieldType = IGame

interface IGameFormProps {
  game?: IGame
  competitions: ICompetition[]
  onFinish: (values: any) => void
}

const dateFormat = 'DD.MM.YYYY'

export const GameForm: FC<IGameFormProps> = (props) => {
  const { game, competitions, onFinish } = props

  const [form] = Form.useForm()

  const competitionOptions = competitions.map((team: ICompetition) => ({ value: team.id, label: team.name }))

  useEffect(() => {
    form.setFieldsValue({
      id: game?.id,
      name: game?.name,
      firstDate: dayjs(game?.firstDate),
      lastDate: dayjs(game?.lastDate),
      status: game.status,
      competitions: game.competitions,
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

      <Form.Item<FieldType>
        label="Дисциплины"
        name="competitions"
        rules={[{ required: true, message: 'Выберите дисциплину' }]}
      >
        <Form.List name="competitions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'competitionId']}
                    rules={[{ required: true, message: 'Выберите дисциплину' }]}
                  >
                    <Select showSearch placeholder="Выберете дисциплину" options={competitionOptions} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Добавить дисциплину
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item<FieldType> label="Статус" name="status" rules={[{ required: true, message: 'Выберите статус' }]}>
        <Radio.Group>
          <Radio value="ожидает начала"> Ожидает начала </Radio>
          <Radio value="идет"> Идет </Radio>
          <Radio value="закончено"> Закончено </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}
