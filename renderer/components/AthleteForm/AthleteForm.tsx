import { Button, DatePicker, Form, Input, Radio, Select } from 'antd'
import dayjs from 'dayjs'
import React, { FC, useEffect } from 'react'

import { IAthlete } from '../../types/IAthlete'
import { ITeam } from '../../types/ITeam'

type FieldType = IAthlete

interface IAthleteFormProps {
  athlete?: IAthlete
  teams: ITeam[]
  onFinish: (values: any) => void
}

const dateFormat = 'DD.MM.YYYY'

export const AthleteForm: FC<IAthleteFormProps> = (props) => {
  const { athlete, teams, onFinish } = props

  const [form] = Form.useForm()

  const teamOptions = teams.map((team: ITeam) => ({ value: team.id, label: team.name }))

  useEffect(() => {
    form.setFieldsValue({
      id: athlete?.id,
      lastName: athlete?.lastName,
      firstName: athlete?.firstName,
      dateOfBirth: dayjs(athlete?.dateOfBirth),
      gender: athlete?.gender,
      weight: athlete?.weight,
      teamId: athlete?.teamId,
    })
  }, [form, athlete])

  return (
    <>
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
        <Form.Item<FieldType> label="Фамилия" name="lastName" rules={[{ required: true, message: 'Введите фамилию' }]}>
          <Input />
        </Form.Item>
        <Form.Item<FieldType> label="Имя" name="firstName" rules={[{ required: true, message: 'Введите имя' }]}>
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Дата рождения"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Введите дату рождения' }]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Form.Item<FieldType> label="Пол" name="gender" rules={[{ required: true, message: 'Укажите пол' }]}>
          <Radio.Group>
            <Radio value="м"> Мужской </Radio>
            <Radio value="ж"> Женский </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item<FieldType> label="Вес" name="weight" rules={[{ required: true, message: 'Введите вес' }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Название команды" name="teamId">
          <Select showSearch placeholder="Введите название команды" options={teamOptions} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
