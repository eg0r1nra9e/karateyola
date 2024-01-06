import { Button, Card, Tabs } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC } from 'react'

import { FireOutlined } from '@ant-design/icons'

import { useAppSelector } from '../../store/hooks'
import { selectAthletes } from '../../store/slices/athletesSlice'
import { selectCompetitions } from '../../store/slices/competitionsSlice'
import { selectGame } from '../../store/slices/gamesSlice'
import { selectTeams } from '../../store/slices/teamsSlice'
import { IDuel } from '../../types/IDuel'

interface IGameFormProps {
  gameId?: string
}

export const GameContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props

  const game = useAppSelector((state) => selectGame(state, gameId))
  const competitions = useAppSelector(selectCompetitions)
  const athletes = useAppSelector(selectAthletes)
  const teams = useAppSelector(selectTeams)

  const items = []

  const getActions = (gameId: string, competitionId: string, categoryName: string, standingId: string) => {
    return [
      <Link key="start" href={`/games/${gameId}/${competitionId}/${categoryName}/${standingId}`}>
        <Button type="primary">
          <FireOutlined />
          Начать
        </Button>
      </Link>,
    ]
  }

  const getAthlete = (athleteId) => {
    const athlete = athletes.find((a) => a.id === athleteId)
    const team = teams.find((t) => t.id === athlete.teamId)
    const athleteName = `${athlete.firstName} ${athlete.lastName}`
    let athleteTeam = ''
    if (team) {
      athleteTeam = ` (${team?.name}, ${team.city})`
    }
    return `${athleteName}${athleteTeam}`
  }

  const getStandings = (gameId: string, competitionId: string, categoriesName: string, standings: IDuel[]) =>
    standings.map((standing) => (
      <Card key={standing?.id} actions={getActions(gameId, competitionId, categoriesName, standing?.id)}>
        <Card>{getAthlete(standing?.athletesId[0])}</Card>
        {standing?.athletesId[1] && <Card>{getAthlete(standing?.athletesId[1])}</Card>}
      </Card>
    ))

  game?.competitions.forEach((competition) => {
    const competitionName = competitions?.find((c) => c.id === competition.id)?.name
    if (competition?.categories?.length) {
      competition?.categories.forEach((category) => {
        if (!category?.standings?.length) {
          return
        }

        items.push({
          key: category.name,
          label: competitionName + ': ' + category?.name,
          children: getStandings(game.id, competition.id, category.name, category.standings),
        })
      })
    }
  })

  return (
    <>
      <h1>{game?.name}</h1>
      <h2>
        {dayjs(game?.dates[0]).format('DD.MM.YYYY')} - {dayjs(game?.dates[1]).format('DD.MM.YYYY')}
      </h2>
      <Tabs defaultActiveKey="1" items={items} indicatorSize={(origin) => origin - 16} />
    </>
  )
}
