import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'

import { MinusOutlined } from '@ant-design/icons'

import { Category } from '@prisma/client'
import { useEffect, useState } from 'react'

export const CategoriesContainer = () => {
  const [categories, setCategories] = useState([])

  const fetchData = async () => {
    const res = await fetch('/api/categories')
    const data = await res.json()
    setCategories(data)
  }

  const deleteCategory = async (categoryId: number) => {
    await fetch(`api/categories/${categoryId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })

    const newCategories = [...categories.filter((category) => category.id !== categoryId)]
    setCategories(newCategories)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns: ColumnsType<Category> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_, category) => <Link href={`/categories/edit/${category.id}`}>{category.name}</Link>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Время боя',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => a.time - b.time,
    },
    {
      title: '',
      key: 'action',
      render: (_, category) => (
        <Button type="primary" danger onClick={() => deleteCategory(category.id)} icon={<MinusOutlined />}>
          Удалить
        </Button>
      ),
    },
  ]

  return <Table dataSource={categories} columns={columns} rowKey="id" />
}
