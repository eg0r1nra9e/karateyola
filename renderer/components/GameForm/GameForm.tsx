import { Button, DatePicker, Form, Input, Modal, Radio, Select, Space } from 'antd'
import dayjs from 'dayjs'
import React, { FC, useEffect } from 'react'

import { IGame } from '../../types/IGame'
import { ICompetition } from '../../types/ICompetition'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import Card from 'antd/es/card/Card'
import { IAthlete } from '../../types/IAthlete'

const { RangePicker } = DatePicker

type FieldType = IGame

interface IGameFormProps {
  game?: IGame
  competitions: ICompetition[]
  athletes: IAthlete[]
  onFinish: (values: any) => void
}

interface IModalFormProps {
  open: boolean
  onCancel: () => void
}

const dateFormat = 'DD.MM.YYYY'

export const GameForm: FC<IGameFormProps> = (props) => {
  const { game, competitions, athletes, onFinish } = props

  const [form] = Form.useForm()

  const competitionOptions = competitions.map((team: ICompetition) => ({ value: team.id, label: team.name }))
  const athleteOptions = athletes.map((athlete: IAthlete) => ({ value: athlete.id, label: athlete.lastName }))

  useEffect(() => {
    form.setFieldsValue({
      id: game?.id,
      name: game?.name,
      dates: [dayjs(game?.dates[0]), dayjs(game?.dates[1])],
      status: game?.status,
      competitions: game?.competitions,
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
        label="Даты проведения"
        name="dates"
        rules={[{ required: true, message: 'Введите даты проведения' }]}
      >
        <RangePicker format={dateFormat} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Дисциплины"
        name="competitions"
        rules={[{ required: true, message: 'Выберите дисциплину' }]}
      >
        <Form.List name="competitions">
          {(competitions, { add, remove }) => {
            return (
              <Card>
                {competitions.map((competition) => (
                  <Card key={competition.key}>
                    <Space key={competition.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                      <Form.Item
                        {...competition}
                        name={[competition.name, 'competitionId']}
                        rules={[{ required: true, message: 'Выберите дисциплину' }]}
                      >
                        <Select showSearch placeholder="Выберете дисциплину" options={competitionOptions} />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(competition.name)
                        }}
                      />
                    </Space>

                    <Form.List name={[competition.name, 'categories']}>
                      {(categories, { add, remove }) => {
                        return (
                          <Card>
                            {categories.map((category) => (
                              <div key={category.key}>
                                <Space key={category.key} align="start">
                                  <Form.Item
                                    {...category}
                                    name={[category.name, 'name']}
                                    rules={[{ required: true, message: 'Введите категорию' }]}
                                  >
                                    <Input placeholder="Введите категорию" />
                                  </Form.Item>

                                  <MinusCircleOutlined
                                    onClick={() => {
                                      remove(category.name)
                                    }}
                                  />
                                </Space>

                                <Form.List name={[competition.name, 'athletes']}>
                                  {(athletes, { add, remove }) => {
                                    return (
                                      <Card>
                                        {athletes.map((athlete) => (
                                          <Space key={athlete.key} align="start">
                                            <Form.Item
                                              {...athlete}
                                              name={[athlete.name]}
                                              rules={[{ required: true, message: 'Выберите спортсмена' }]}
                                            >
                                              <Select
                                                showSearch
                                                placeholder="Выберете спортсмена"
                                                options={athleteOptions}
                                              />
                                            </Form.Item>

                                            <MinusCircleOutlined
                                              onClick={() => {
                                                remove(athlete.name)
                                              }}
                                            />
                                          </Space>
                                        ))}

                                        <Form.Item>
                                          <Button
                                            type="dashed"
                                            onClick={() => {
                                              add()
                                            }}
                                            block
                                          >
                                            <PlusOutlined /> Добавить спортсмена
                                          </Button>
                                        </Form.Item>
                                      </Card>
                                    )
                                  }}
                                </Form.List>
                              </div>
                            ))}

                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => {
                                  add()
                                }}
                                block
                              >
                                <PlusOutlined /> Добавить категорию
                              </Button>
                            </Form.Item>
                          </Card>
                        )
                      }}
                    </Form.List>
                  </Card>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add()
                    }}
                    block
                  >
                    <PlusOutlined /> Добавить дисциплину
                  </Button>
                </Form.Item>
              </Card>
            )
          }}
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
