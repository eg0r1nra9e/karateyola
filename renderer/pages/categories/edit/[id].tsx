import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { CategoryFormContainer } from '../../../feature/categories/containers/CategoryFormContainer/CategoryFormContainer'

const CategoryEdit: NextPage = () => {
  const router = useRouter()
  const { query } = router

  return (
    <>
      <h1>Редактирование категории</h1>
      <CategoryFormContainer categoryId={query?.id?.toString()} />
    </>
  )
}

export default CategoryEdit
