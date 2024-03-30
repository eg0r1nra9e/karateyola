import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'

import { ApartmentOutlined, MinusOutlined, ThunderboltOutlined } from '@ant-design/icons'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectCompetitions } from '../../store/slices/competitionsSlice'
import { endGame, removeGame, selectGames, startGame } from '../../store/slices/gamesSlice'
import { IGame } from '../../types/IGame'
import { useRouter } from 'next/router'

export const GamesContainer = () => {
  const games = useAppSelector(selectGames)
  const dispatch = useAppDispatch()
  const competitions = useAppSelector(selectCompetitions)
  const { push } = useRouter()

  const deleteGame = (gameId: string) => {
    dispatch(removeGame(gameId))
  }

  const gameCompetitions = (game: IGame) => {
    if (!game.competitions || !game.competitions.length) {
      return null
    }

    return game.competitions.map((competition) => {
      const competitionName = competitions.find((c) => c.id === competition.id)?.name
      return <div key={competition.id}>{competitionName}</div>
    })
  }

  const gameDates = (game: IGame) => {
    if (!game?.dates || !game?.dates?.length) {
      return null
    }

    return (
      <>
        {dayjs(game?.dates[0])
          .format('DD.MM.YYYY')
          .toString()}
        -
        {dayjs(game?.dates[1])
          .format('DD.MM.YYYY')
          .toString()}
      </>
    )
  }

  const columns: ColumnsType<IGame> = [
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
      render: (_, game) => gameDates(game),
      sorter: (a, b) => (new Date(a.dates[0])).getTime() - (new Date(b.dates[0])).getTime()
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
