import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { MinusOutlined } from '@ant-design/icons'
import { Competition } from '@prisma/client'

export const CompetitionsContainer = () => {
  const [competitions, setCompetitions] = useState([])

  const fetchData = async () => {
    const res = await fetch('/api/competitions')
    const data = await res.json()
    setCompetitions(data)
  }

  const deleteCompetition = async (teamId: number) => {
    await fetch(`api/competitions/${teamId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })

    const newCompetitions = [...competitions.filter((team) => team.id !== teamId)]
    setCompetitions(newCompetitions)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns: ColumnsType<Competition> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_, competition) => <Link href={`/competitions/edit/${competition.id}`}>{competition.name}</Link>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: '',
      key: 'action',
      render: (_, competition) => (
        <Button type="primary" danger onClick={() => deleteCompetition(competition.id)} icon={<MinusOutlined />}>
          Удалить
        </Button>
      ),
    },
  ]

  return <Table dataSource={competitions} columns={columns} rowKey="id" />
}
