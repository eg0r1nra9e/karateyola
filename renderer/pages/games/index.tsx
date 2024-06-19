import { Button, Space } from 'antd'
import { NextPage } from 'next'
import Link from 'next/link'

import { PlusOutlined } from '@ant-design/icons'

import { GamesContainer } from '../../feature/games/containers/GamesContainer/GamesContainer'

const Games: NextPage = () => {
  return (
    <>
      <h1>Соревнования</h1>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Link href="/games/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить
          </Button>
        </Link>
        <GamesContainer />
      </Space>
    </>
  )
}

export default Games
