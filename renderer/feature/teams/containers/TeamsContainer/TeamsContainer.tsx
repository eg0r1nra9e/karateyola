import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { DeleteButton } from '../../../../shared/ui/DeleteButton/DeleteButton'
import { TeamWithCity } from '../../../../types/TeamWithCity'

export const TeamsContainer = () => {
  const [teams, setTeams] = useState<TeamWithCity[]>([])

  const fetchData = async () => {
    const res = await fetch('/api/teams')
    const data = await res.json()
    setTeams(data)
  }

  const deleteTeam = async (teamId: number) => {
    await fetch(`api/teams/${teamId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })

    const newTeams = [...teams.filter((team) => team.id !== teamId)]
    setTeams(newTeams)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns: ColumnsType<TeamWithCity> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_, team) => <Link href={`/teams/edit/${team.id}`}>{team.name}</Link>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Город',
      dataIndex: 'city',
      key: 'city',
      render: (_, team) => (team.city?.city ? `${team.city?.city}` : ''),
      sorter: (a, b) => a.city.city.localeCompare(b.city.city),
    },
    {
      title: '',
      key: 'delete',
      fixed: 'right',
      width: 100,
      render: (_, team) => (
        <DeleteButton
          title="Удалить команду"
          description="Вы уверены, что хотите удалить эту команду?"
          onClick={() => deleteTeam(team.id)}
        ></DeleteButton>
      ),
    },
  ]

  return (
    <>
      <Table dataSource={teams} columns={columns} rowKey="id" />
    </>
  )
}
