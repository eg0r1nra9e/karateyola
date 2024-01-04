import { Button, Space } from 'antd'
import { NextPage } from 'next'
import Link from 'next/link'

import { PlusOutlined } from '@ant-design/icons'

import { CompetitionsContainer } from '../../containers/CompetitionsContainer/CompetitionsContainer'

const Teams: NextPage = () => {
  return (
    <>
      <h1>Дисциплины</h1>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Link href="/competitions/add">
          <Button type="primary" icon={<PlusOutlined className="competitionSocialIcon" />}>
            Добавить
          </Button>
        </Link>
        <CompetitionsContainer />
      </Space>
    </>
  )
}

export default Teams
