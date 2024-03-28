import { useRouter } from 'next/router'
import { FC } from 'react'

import { CategoryForm } from '../../components/CategoryForm/CategoryForm'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addCategory, editCategory, selectCategory } from '../../store/slices/categoriesSlice'

interface ICategoryFormProps {
  categoryId?: string
  name?: string
}

export const CategoryFormContainer: FC<ICategoryFormProps> = (props) => {
  const { categoryId } = props

  const { push } = useRouter()

  const dispatch = useAppDispatch()

  const category = useAppSelector((state) => selectCategory(state, categoryId))

  const onFinish = (category: any) => {
    if (!categoryId) {
      dispatch(addCategory(category))
    } else {
      dispatch(editCategory(category))
    }

    push('/categories/')
  }

  return <CategoryForm category={category} onFinish={onFinish} />
}
