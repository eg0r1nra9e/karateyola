import { Button, Card, Divider, Form, Select, Space } from 'antd'
import { FC } from 'react'

import { Category, Competition } from '@prisma/client'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { GameWithAll } from '../../types/GameWithAll'

type FieldType = GameWithAll

interface IGameCompetitionsFormProps {
  game?: GameWithAll
  competitions: Competition[]
  categories: Category[]
  onFinish: (values: any) => void
  onBack: (values: any) => void
}

export const GameCompetitionsForm: FC<IGameCompetitionsFormProps> = (props) => {
  const { game, competitions, categories, onFinish, onBack } = props
  const [form] = Form.useForm()

  const competitionOptions = competitions.map((competition: Competition) => ({
    value: competition.id,
    label: competition.name,
  }))
  const categoriesOptions = categories.map((category: Category) => ({
    value: category.id,
    label: category.name,
  }))

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={game}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item<FieldType> label="Дисциплины" rules={[{ required: true, message: 'Выберите дисциплину' }]}>
        <Form.List name="competitions">
          {(competitions, { add, remove }) => {
            return (
              <Card>
                {competitions.map((competition) => (
                  <Card key={competition.key} style={{ marginBottom: 16 }}>
                    <Space key={competition.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                      <Form.Item
                        {...competition}
                        name={[competition.name, 'id']}
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
                                    name={[category.name, 'id']}
                                    rules={[{ required: true, message: 'Выберите категорию' }]}
                                  >
                                    <Select showSearch placeholder="Выберете категорию" options={categoriesOptions} />
                                  </Form.Item>
                                  <MinusCircleOutlined
                                    onClick={() => {
                                      remove(category.name)
                                    }}
                                  />
                                </Space>
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
      <Divider />
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Продолжить
          </Button>
          <Button htmlType="button" onClick={onBack}>
            Назад
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
