import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'

import { MinusOutlined } from '@ant-design/icons'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeCategory, selectCategories } from '../../store/slices/categoriesSlice'
import { ICategory } from '../../types/ICategory'

export const CategoriesContainer = () => {
  const categories = useAppSelector(selectCategories)
  const dispatch = useAppDispatch()

  const deletecategory = (categoryId: string) => {
    dispatch(removeCategory(categoryId))
  }

  const columns: ColumnsType<ICategory> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_, category) => <Link href={`/categories/edit/${category.id}`}>{category.name}</Link>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: '',
      key: 'action',
      render: (_, category) => (
        <Button type="primary" danger onClick={() => deletecategory(category.id)} icon={<MinusOutlined />}>
          Удалить
        </Button>
      ),
    },
  ]

  return <Table dataSource={categories} columns={columns} />
}
