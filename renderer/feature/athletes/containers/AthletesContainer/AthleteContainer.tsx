import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { DeleteButton } from '../../../../shared/ui/DeleteButton/DeleteButton'
import { AthleteWithTeamAndCity } from '../../../../types/AthleteWithTeamAndCity'

export const AthletesContainer = () => {
  const [athletes, setAthletes] = useState<AthleteWithTeamAndCity[]>([])

  const fetchData = async () => {
    const res = await fetch('/api/athletes')
    const data = await res.json()
    setAthletes(data)
  }

  const deleteAthlete = async (athleteId: number) => {
    await fetch(`api/athletes/${athleteId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })

    const newAthletes = [...athletes.filter((athlete) => athlete.id !== athleteId)]
    setAthletes(newAthletes)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns: ColumnsType<AthleteWithTeamAndCity> = [
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (_, athlete) => <Link href={`/athletes/edit/${athlete.id}`}>{athlete.lastName}</Link>,
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Дата рождения',
      dataIndex: 'date',
      key: 'date',
      render: (_, athlete) => dayjs(athlete?.dateOfBirth).format('DD.MM.YYYY').toString(),
      sorter: (a, b) => a.dateOfBirth.getTime() - b.dateOfBirth.getTime(),
    },
    {
      title: 'Пол',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: 'Вес',
      dataIndex: 'weight',
      key: 'weight',
      sorter: (a, b) => a.weight - b.weight,
    },
    {
      title: 'Команда',
      dataIndex: 'teamId',
      key: 'teamId',
      render: (_, athlete) => athlete.team?.name,
      sorter: (a, b) => a.team?.name?.localeCompare(b.team?.name),
    },
    {
      title: '',
      key: 'delete',
      fixed: 'right',
      width: 100,
      render: (_, athlete) => (
        <DeleteButton
          title="Удалить спортсмена"
          description="Вы уверены, что хотите удалить этого спортсмена?"
          onClick={() => deleteAthlete(athlete.id)}
        ></DeleteButton>
      ),
    },
  ]

  return <Table dataSource={athletes} columns={columns} rowKey="id" />
}
