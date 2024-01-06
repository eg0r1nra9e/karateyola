import { useRouter } from 'next/router'
import { FC } from 'react'
import dayjs from 'dayjs'

import { GameForm } from '../../components/GameForm/GameForm'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectAthletes } from '../../store/slices/athletesSlice'
import { selectCompetitions } from '../../store/slices/competitionsSlice'
import { addGame, editGame, selectGame } from '../../store/slices/gamesSlice'
import { IGame } from '../../types/IGame'
import { GameDuelsComponent } from '../../components/GameDuelsComponent/GameDuelsComponent'
import { selectTeams } from '../../store/slices/teamsSlice'
import { Button, Empty, Tabs } from 'antd'
import Link from 'next/link'
import { FireOutlined } from '@ant-design/icons'

interface IGameFormProps {
  gameId?: string
}

export const GameContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props
  const { push } = useRouter()

  const dispatch = useAppDispatch()

  const game = useAppSelector((state) => selectGame(state, gameId))
  const competitions = useAppSelector(selectCompetitions)
  const athletes = useAppSelector(selectAthletes)
  const teams = useAppSelector(selectTeams)

  const items = []

  const getActions = (duelId) => {
    return [
      <Link key="start" href={`/games/${gameId}/${duelId}`}>
        <Button type="primary">
          <FireOutlined />
          Начать
        </Button>
      </Link>,
    ]
  }

  game?.competitions.forEach((competition) => {
    const competitionName = competitions?.find((c) => c.id === competition.competitionId)?.name
    if (competition?.categories?.length) {
      competition?.categories.forEach((category) => {
        if (!category?.standings?.length) {
          return
        }
        const actions = [
          <Link key="start" href={`/games/${gameId}/`}>
            <Button type="primary">
              <FireOutlined />
              Начать
            </Button>
          </Link>,
        ]
        items.push({
          key: category.name,
          label: competitionName + ': ' + category?.name,
          children: (
            <>
              <GameDuelsComponent athletes={athletes} teams={teams} standings={category.standings} />
            </>
          ),
        })
      })
    }
  })
  const onFinish = (game: IGame) => {
    if (!gameId) {
      dispatch(addGame(game))
    } else {
      dispatch(editGame(game))
    }
  }

  return (
    <>
      <h1>{game.name}</h1>
      <h2>
        {dayjs(game.dates[0]).format('DD.MM.YYYY')} - {dayjs(game.dates[1]).format('DD.MM.YYYY')}
      </h2>
      <Tabs defaultActiveKey="1" items={items} indicatorSize={(origin) => origin - 16} />
    </>
  )
}
