import { Button, Space } from 'antd'
import { NextPage } from 'next'
import Link from 'next/link'

import { PlusOutlined } from '@ant-design/icons'

import { AthletesContainer } from '../../feature/athletes/containers/AthletesContainer/AthleteContainer'

const Athletes: NextPage = () => {
  return (
    <>
      <h1>Спортсмены</h1>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Link href="/athletes/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить
          </Button>
        </Link>
        <AthletesContainer />
      </Space>
    </>
  )
}

export default Athletes
