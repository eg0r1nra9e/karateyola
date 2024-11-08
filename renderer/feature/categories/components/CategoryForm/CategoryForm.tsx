import { Button, Form, Input } from 'antd'
import { FC, useEffect } from 'react'

import { Category } from '@prisma/client'

type FieldType = Category

interface ICategoryFormProps {
  category?: Category
  onFinish: (values: any) => void
}

export const CategoryForm: FC<ICategoryFormProps> = (props) => {
  const { category, onFinish } = props

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      id: category?.id,
      name: category?.name,
      time: category?.time,
    })
  }, [form, category])

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
        label="Название категории"
        name="name"
        rules={[{ required: true, message: 'Введите название категории' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Время боя"
        name="time"
        rules={[{ required: true, message: 'Введите длительность боя (в сек.)' }]}
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
