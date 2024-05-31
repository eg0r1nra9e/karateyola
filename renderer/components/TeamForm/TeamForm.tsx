import { Button, Form, Input, Select } from 'antd'
import { FC, useEffect } from 'react'

import { City } from '@prisma/client'
import { ITeam } from '../../types/ITeam'
import { TeamWithCity } from '../../types/TeamWithCity'

type FieldType = ITeam

interface ITeamFormProps {
  team?: TeamWithCity
  cities: City[]
  onFinish: (values: any) => void
}

export const TeamForm: FC<ITeamFormProps> = (props) => {
  const { team, cities, onFinish } = props
  const [form] = Form.useForm()

  const cityOptions = cities.map((city: City) => ({ value: city.id, label: city.city }))
  cityOptions.unshift({ value: null, label: 'Не выбрано' })

  useEffect(() => {
    form.setFieldsValue({
      id: team?.id,
      name: team?.name,
      cityId: team?.cityId,
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
      <Form.Item<FieldType> name="id" hidden={true}>
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Название команды"
        name="name"
        rules={[{ required: true, message: 'Введите название команды' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType> label="Населенный пункт" name="cityId">
        <Select showSearch optionFilterProp="label" placeholder="Выберете населенный пункт" options={cityOptions} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}
