import { useRouter } from 'next/router'
import { FC } from 'react'

import { CategoryForm } from '../../components/CategoryForm/CategoryForm'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addCategory, editCategory, selectCategory } from '../../store/slices/categoriesSlice'

interface CategoryFormProps {
  categoryId?: string
}

export const CategoryFormContainer: FC<CategoryFormProps> = (props) => {
  const { categoryId } = props
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  const category = useAppSelector((state) => selectCategory(state, categoryId))

  const onFinish = (team: any) => {
    if (!categoryId) {
      dispatch(addCategory(team))
    } else {
      dispatch(editCategory(team))
    }

    push('/categories/')
  }

  return <CategoryForm category={category} onFinish={onFinish} />
}
