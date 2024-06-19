import { Button, Space } from 'antd'
import { NextPage } from 'next'
import Link from 'next/link'

import { PlusOutlined } from '@ant-design/icons'

import { TeamsContainer } from '../../feature/teams/containers/TeamsContainer/TeamsContainer'

const Teams: NextPage = () => {
  return (
    <>
      <h1>Команды</h1>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Link href="/teams/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Добавить
          </Button>
        </Link>
        <TeamsContainer />
      </Space>
    </>
  )
}

export default Teams
