import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { FC } from 'react'

import { Athlete, GameCompetition } from '@prisma/client'

import { AthleteWithTeamAndCity } from '../../../../types/AthleteWithTeamAndCity'
import { GameCategoryWithAthlete } from '../../../../types/GameCategoryWithAthlete'

interface IGameAthletesContainerProps {
  competition: GameCompetition
  category: GameCategoryWithAthlete
  athletes: AthleteWithTeamAndCity[]

  onChange: (competitionId: number, categoryId: number, athletesIds: number[]) => void
}

interface DataType extends Athlete {
  key: React.Key
  age: number
  team: string
}

export const GameAthletesTable: FC<IGameAthletesContainerProps> = (props) => {
  const { competition, category, athletes, onChange } = props

  const columns: ColumnsType<DataType> = [
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (_, athlete) => <Link href={`/athletes/edit/${athlete.id}`}>{athlete.lastName}</Link>,
      sorter: (a, b) => a.lastName.length - b.lastName.length,
    },
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName.length - b.firstName.length,
    },
    {
      title: 'Пол',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.length - b.gender.length,
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.dateOfBirth.getTime() - b.dateOfBirth.getTime(),
    },
    {
      title: 'Вес',
      dataIndex: 'weight',
      key: 'weight',
      sorter: (a, b) => a.weight - b.weight,
    },
    {
      title: 'Команда',
      dataIndex: 'team',
      key: 'team',
      sorter: (a, b) => a.team.length - b.team.length,
    },
  ]

  const getAge = (date: Date): number => {
    return ((new Date().getTime() - new Date(date).getTime()) / (24 * 3600 * 365.25 * 1000)) | 0
  }

  const data: DataType[] = athletes.map(
    (athlete): DataType => ({
      ...athlete,
      key: athlete.id,
      age: getAge(athlete.dateOfBirth),
      team: athlete.team?.name,
    }),
  )

  const rowSelection = {
    selectedRowKeys: category.athletes?.map((athlete) => athlete.id) ?? [],
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      onChange(
        competition.id,
        category.id,
        selectedRowKeys.map((key) => +key.toString()),
      )
    },
  }

  return (
    <Table
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
      columns={columns}
      dataSource={data}
      rowKey="id"
    />
  )
}
