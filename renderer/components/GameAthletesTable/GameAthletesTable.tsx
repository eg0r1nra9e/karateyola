import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { FC } from 'react'

import { IAthlete } from '../../types/IAthlete'
import { IGameCompetitionCategory } from '../../types/IGameCompetitionCategory'
import { ITeam } from '../../types/ITeam'

interface IGameAthletesContainerProps {
  category: IGameCompetitionCategory
  teams: ITeam[]
  athletes: IAthlete[]
  onChange: (category: IGameCompetitionCategory, athletesIds: string[]) => void
}

interface DataType extends IAthlete {
  key: React.Key
}

export const GameAthletesTable: FC<IGameAthletesContainerProps> = (props) => {
  const { category, teams, athletes, onChange } = props

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
      render: (_, athlete) => {
        let age = ((new Date().getTime() - new Date(athlete?.dateOfBirth).getTime()) / (24 * 3600 * 365.25 * 1000)) | 0
        return age
      },
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
      dataIndex: 'teamId',
      key: 'teamId',
      render: (_, athlete) => teams?.find((team) => team.id === athlete.teamId)?.name,
    },
  ]

  const data: DataType[] = athletes.map((athlete) => ({ ...athlete, key: athlete.id }))

  const rowSelection = {
    selectedRowKeys: category.athletes,
    onChange: (selectedRowKeys: React.Key[], selectedRows: IAthlete[]) => {
      onChange(
        category,
        selectedRowKeys.map((key) => key.toString()),
      )
    },
  }

  return <Table rowSelection={rowSelection} dataSource={data} columns={columns} />
}