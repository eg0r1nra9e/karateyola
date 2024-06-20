import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Competition } from '@prisma/client'

import { DeleteButton } from '../../../../shared/ui/DeleteButton/DeleteButton'

export const CompetitionsContainer = () => {
  const [competitions, setCompetitions] = useState([])

  const fetchData = async () => {
    const res = await fetch('/api/competitions')
    const data = await res.json()
    setCompetitions(data)
  }

  const deleteCompetition = async (competitionId: number) => {
    await fetch(`api/competitions/${competitionId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })

    const newCompetitions = [...competitions.filter((competition) => competition.id !== competitionId)]
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
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '',
      key: 'delete',
      fixed: 'right',
      width: 100,
      render: (_, competition) => (
        <DeleteButton
          title="Удалить дисциплину"
          description="Вы уверены, что хотите удалить эту дисциплину?"
          onClick={() => deleteCompetition(competition.id)}
        ></DeleteButton>
      ),
    },
  ]

  return <Table dataSource={competitions} columns={columns} rowKey="id" />
}
