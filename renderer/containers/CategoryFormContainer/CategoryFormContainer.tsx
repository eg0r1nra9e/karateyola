import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { CategoryForm } from '../../components/CategoryForm/CategoryForm'
import { Category } from '@prisma/client'
interface ICategoryFormProps {
  categoryId?: string
}

export const CategoryFormContainer: FC<ICategoryFormProps> = (props) => {
  const { categoryId } = props

  const { push } = useRouter()

  const [category, setCategory] = useState<Category>()

  const fetchData = async () => {
    if (categoryId) {
      const resCategory = await fetch(`/api/categories/${categoryId}`)
      const category = await resCategory.json()
      setCategory(category)
    }
  }

  const onFinish = async (team: Category) => {
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

    push('/categories/')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <CategoryForm category={category} onFinish={onFinish} />
}
