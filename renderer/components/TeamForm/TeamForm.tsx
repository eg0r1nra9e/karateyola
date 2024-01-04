import { Button, Form, Input, Select } from 'antd'
import { FC, useEffect } from 'react'

import { ITeam } from '../../types/ITeam'

type FieldType = {
  id?: string
  name?: string
  city?: string
}

export interface ICity {
  region: string
  city: string
}

interface ITeamFormProps {
  team?: ITeam
  cities: ICity[]
  onFinish: (values: any) => void
}

export const TeamForm: FC<ITeamFormProps> = (props) => {
  const { team, cities, onFinish } = props
  const [form] = Form.useForm()

  const cityOptions = cities.map((city: ICity) => ({ value: city.city, label: city.city }))

  useEffect(() => {
    form.setFieldsValue({
      id: team?.id,
      name: team?.name,
      city: team?.city,
    })
  }, [form, team])

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
      <Form.Item<FieldType> label="Идентификатор команды" name="id" hidden={true}>
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Название команды"
        name="name"
        rules={[{ required: true, message: 'Введите название команды' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Населенный пункт"
        name="city"
        rules={[{ required: true, message: 'Выберете населенный пункт' }]}
      >
        <Select showSearch placeholder="Выберете населенный пункт" options={cityOptions} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}
