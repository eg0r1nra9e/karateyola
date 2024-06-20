import { App } from 'antd'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { Category } from '@prisma/client'

import { CategoryForm } from '../../components/CategoryForm/CategoryForm'

interface ICategoryFormProps {
  categoryId?: string
}

export const CategoryFormContainer: FC<ICategoryFormProps> = (props) => {
  const { categoryId } = props

  const { push } = useRouter()
  const { notification } = App.useApp()
  const [category, setCategory] = useState<Category>()

  const fetchData = async () => {
    if (categoryId) {
      const resCategory = await fetch(`/api/categories/${categoryId}`)
      const category = await resCategory.json()
      setCategory(category)
    }
  }

  const onFinish = async (team: Category) => {
    try {
      if (!categoryId) {
        await fetch('/api/categories/create', {
          body: JSON.stringify(team),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
      } else {
        await fetch(`/api/categories/${categoryId}`, {
          body: JSON.stringify(team),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        })
      }

      notification.success({
        message: `Сохранение`,
        description: 'Категория сохранена',
      })
    } catch (error) {
      notification.error({
        message: `Сохранение`,
        description: 'При сохранении произошла ошибка.',
      })
    }

    push('/categories/')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <CategoryForm category={category} onFinish={onFinish} />
    </>
  )
}
