import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'

import { MinusOutlined } from '@ant-design/icons'

import { useEffect, useState } from 'react'
import { GameWithAll } from '../../../../types/GameWithAll'

export const GamesContainer = () => {
  const [games, setGames] = useState([])

  const fetchData = async () => {
    const res = await fetch('/api/games')
    const data = await res.json()
    setGames(data)
  }

  const deleteGame = async (gameId: number) => {
    await fetch(`api/games/${gameId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })

    const newCategories = [...games.filter((category) => category.id !== gameId)]
    setGames(newCategories)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns: ColumnsType<GameWithAll> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_, game) => <Link href={`/games/edit/${game.id}`}>{game.name}</Link>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Дата начала',
      dataIndex: 'dates',
      key: 'dates',
      render: (_, game) => dayjs(game?.startDate).format('DD.MM.YYYY').toString(),
      sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    },
    {
      title: 'Дата окончания',
      dataIndex: 'dates',
      key: 'dates',
      render: (_, game) => dayjs(game?.endDate).format('DD.MM.YYYY').toString(),
      sorter: (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
    },
    {
      title: 'Дисциплины',
      dataIndex: 'competitions',
      key: 'competitions',
      render: (_, game) =>
        game.competitions.map((c) => {
          return <div key={c.competition.id}>{c.competition.name}</div>
        }),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: '',
      key: 'delete',
      render: (_, game) => (
        <Button type="primary" danger onClick={() => deleteGame(game.id)} icon={<MinusOutlined />}>
          Удалить
        </Button>
      ),
    },
  ]

  return <Table dataSource={games} columns={columns} rowKey="id" />
}
