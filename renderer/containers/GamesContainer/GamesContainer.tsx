import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'

import { MinusOutlined } from '@ant-design/icons'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeGame, selectGames } from '../../store/slices/gamesSlice'
import { IGame } from '../../types/IGame'

export const GamesContainer = () => {
  const teams = useAppSelector(selectGames)
  const dispatch = useAppDispatch()

  const deleteTeam = (gameId: string) => {
    dispatch(removeGame(gameId))
  }

  const columns: ColumnsType<IGame> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_, team) => <Link href={`/games/edit/${team.id}`}>{team.name}</Link>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Дата начала',
      dataIndex: 'firstDate',
      key: 'firstDate',
      render: (_, athlete) =>
        dayjs(athlete?.firstDate)
          .format('DD.MM.YYYY')
          .toString(),
      sorter: (a, b) => a.firstDate.getTime() - b.firstDate.getTime(),
    },
    {
      title: 'Дата окончания',
      dataIndex: 'date',
      key: 'date',
      render: (_, athlete) =>
        dayjs(athlete?.lastDate)
          .format('DD.MM.YYYY')
          .toString(),
      sorter: (a, b) => a.lastDate.getTime() - b.lastDate.getTime(),
    },
    {
      title: '',
      key: 'action',
      render: (_, team) => (
        <Button type="primary" danger onClick={() => deleteTeam(team.id)} icon={<MinusOutlined />}>
          Удалить
        </Button>
      ),
    },
  ]

  return <Table dataSource={teams} columns={columns} />
}
