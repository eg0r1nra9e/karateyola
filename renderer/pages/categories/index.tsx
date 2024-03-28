import { Button, Space } from 'antd'
import { NextPage } from 'next'
import Link from 'next/link'

import { PlusOutlined } from '@ant-design/icons'

import { CategoriesContainer } from '../../containers/CategoriesContainer/CategoriesContainer'

const Teams: NextPage = () => {
  return (
    <>
      <h1>Категории</h1>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Link href="/categories/add">
          <Button type="primary" icon={<PlusOutlined className="categoriesSocialIcon" />}>
            Добавить
          </Button>
        </Link>
        <CategoriesContainer />
      </Space>
    </>
  )
}

export default Teams
