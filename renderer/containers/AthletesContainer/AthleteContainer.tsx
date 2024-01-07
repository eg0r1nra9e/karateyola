import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'

import { MinusOutlined } from '@ant-design/icons'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeAthlete, selectAthletes } from '../../store/slices/athletesSlice'
import { selectTeams } from '../../store/slices/teamsSlice'
import { IAthlete } from '../../types/IAthlete'

export const AthletesContainer = () => {
  const athletes = useAppSelector(selectAthletes)
  const dispatch = useAppDispatch()

  const teams = useAppSelector(selectTeams)

  const deleteAthlete = (athleteId: string) => {
    dispatch(removeAthlete(athleteId))
  }

  const columns: ColumnsType<IAthlete> = [
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
      title: 'Дата рождения',
      dataIndex: 'date',
      key: 'date',
      render: (_, athlete) =>
        dayjs(athlete?.dateOfBirth)
          .format('DD.MM.YYYY')
          .toString(),
      sorter: (a, b) => a.dateOfBirth.getTime() - b.dateOfBirth.getTime(),
    },
    {
      title: 'Пол',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a, b) => a.gender.length - b.gender.length,
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
    {
      title: '',
      key: 'action',
      render: (_, athlete) => (
        <Button
          type="primary"
          danger
          onClick={() => deleteAthlete(athlete.id)}
          icon={<MinusOutlined className="athleteSocialIcon" />}
        >
          Удалить
        </Button>
      ),
    },
  ]

  return <Table dataSource={athletes} columns={columns} />
}
