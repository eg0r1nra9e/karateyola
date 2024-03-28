import { NextPage } from 'next'

import { CategoryFormContainer } from '../../../containers/CategoryFormContainer/CategoryFormContainer'

const CategoryAdd: NextPage = () => {
  return (
    <>
      <h1>Добавление категории</h1>
      <CategoryFormContainer />
    </>
  )
}

export default CategoryAdd
