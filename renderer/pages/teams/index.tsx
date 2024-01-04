import { NextPage } from 'next'
import Link from 'next/link'
import { TeamsContainer } from '../../containers/TeamsContainer/TeamsContainer'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const Teams: NextPage = () => {
  return (
    <>
      <h1>Команды</h1>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Link href="/teams/add">
          <Button type="primary" icon={<PlusOutlined className="teamSocialIcon" />}>
            Добавить
          </Button>
        </Link>
        <TeamsContainer />
      </Space>
    </>
  )
}

export default Teams
