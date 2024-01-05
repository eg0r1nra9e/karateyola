import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'

import { ApartmentOutlined, MinusOutlined, ThunderboltOutlined } from '@ant-design/icons'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { endGame, removeGame, selectGames, startGame } from '../../store/slices/gamesSlice'
import { IGame } from '../../types/IGame'
import { selectCompetitions } from '../../store/slices/competitionsSlice'

export const GamesContainer = () => {
  const games = useAppSelector(selectGames)
  const dispatch = useAppDispatch()
  const competitions = useAppSelector(selectCompetitions)

  const deleteGame = (gameId: string) => {
    dispatch(removeGame(gameId))
  }

  const start = (gameId: string) => {
    dispatch(startGame(gameId))
  }

  const end = (gameId: string) => {
    dispatch(endGame(gameId))
  }

  const gameAction = (game: IGame) => {
    if (game.status === 'ожидает начала') {
      return (
        <Button type="primary" onClick={() => start(game.id)} icon={<ApartmentOutlined />}>
          Начать
        </Button>
      )
    }

    if (game.status === 'идет') {
      return (
        <Button type="primary" onClick={() => end(game.id)} icon={<ThunderboltOutlined />}>
          Закончить
        </Button>
      )
    }

    return null
  }

  const gameCompetitions = (game: IGame) => {
    if (!game.competitions || !game.competitions.length) {
      return null
    }

    return game.competitions.map((competition) => {
      const competitionName = competitions.find((c) => c.id === competition.competitionId)?.name
      return <div key={competition.competitionId}>{competitionName}</div>
    })
  }

  const columns: ColumnsType<IGame> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_, game) => <Link href={`/games/edit/${game.id}`}>{game.name}</Link>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Дата начала',
      dataIndex: 'firstDate',
      key: 'firstDate',
      render: (_, game) =>
        dayjs(game?.firstDate)
          .format('DD.MM.YYYY')
          .toString(),
      sorter: (a, b) => a.firstDate.getTime() - b.firstDate.getTime(),
    },
    {
      title: 'Дата окончания',
      dataIndex: 'date',
      key: 'date',
      render: (_, game) =>
        dayjs(game?.lastDate)
          .format('DD.MM.YYYY')
          .toString(),
      sorter: (a, b) => a.lastDate.getTime() - b.lastDate.getTime(),
    },
    {
      title: 'Дисциплины',
      dataIndex: 'competitions',
      key: 'competitions',
      render: (_, game) => gameCompetitions(game),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: '',
      key: 'action',
      render: (_, game) => gameAction(game),
    },
    {
      title: '',
      key: 'action',
      render: (_, game) => (
        <Button type="primary" danger onClick={() => deleteGame(game.id)} icon={<MinusOutlined />}>
          Удалить
        </Button>
      ),
    },
  ]

  return <Table dataSource={games} columns={columns} />
}
