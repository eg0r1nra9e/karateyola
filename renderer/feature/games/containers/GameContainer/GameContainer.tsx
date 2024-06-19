import { Button, Card, Flex, Tabs } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC } from 'react'

import { FireOutlined } from '@ant-design/icons'

import { useAppSelector } from '../../../../store/hooks'
import { selectAthletes } from '../../../../store/slices/athletesSlice'
import { selectCategories } from '../../../../store/slices/categoriesSlice'
import { selectCompetitions } from '../../../../store/slices/competitionsSlice'
import { selectGame } from '../../../../store/slices/gamesSlice'
import { selectTeams } from '../../../../store/slices/teamsSlice'
import { IStanding } from '../../../../types/IStanding'

interface IGameFormProps {
  gameId?: string
}

export const GameContainer: FC<IGameFormProps> = (props) => {
  const { gameId } = props

  const game = useAppSelector((state) => selectGame(state, gameId))
  const competitions = useAppSelector(selectCompetitions)
  const categories = useAppSelector(selectCategories)
  const athletes = useAppSelector(selectAthletes)
  const teams = useAppSelector(selectTeams)

  const items = []

  const getActions = (
    gameId: string,
    competitionId: string,
    categoryId: string,
    standingId: string,
    duelId: string,
  ) => {
    return [
      <Link key="start" href={`/games/${gameId}/${competitionId}/${categoryId}/${standingId}/${duelId}`}>
        <Button type="primary">
          <FireOutlined />
          Начать поединок
        </Button>
      </Link>,
    ]
  }

  const getAthlete = (athleteId) => {
    const athlete = athletes.find((a) => a.id === athleteId)
    const team = teams.find((t) => t.id === athlete?.teamId)
    const athleteName = `${athlete?.firstName} ${athlete?.lastName}`
    let athleteTeam = ''
    if (team) {
      athleteTeam = ` (${team?.name}, ${team.cityId})`
    }
    return `${athleteName}${athleteTeam}`
  }

  const getStandings = (gameId: string, competitionId: string, categoryId: string, standings: IStanding[]) =>
    standings.map((standing) => (
      <Card key={standing?.id}>
        {standing?.duels?.map((duel) => (
          <Card
            key={duel?.id}
            actions={!duel.winner && getActions(gameId, competitionId, categoryId, standing?.id, duel?.id)}
          >
            {duel.athletesId.map((athleteId) => (
              <Card key={athleteId}>{getAthlete(athleteId)}</Card>
            ))}
          </Card>
        ))}
      </Card>
    ))

  const getCategoryName = (categoryId) => {
    return categories.find((category) => category.id === categoryId)?.name
  }

  game?.competitions.forEach((competition) => {
    const competitionName = competitions?.find((c) => c.id === competition.id)?.name
    if (competition?.categories?.length) {
      competition?.categories.forEach((category) => {
        if (!category?.standings?.length) {
          return
        }

        items.push({
          key: competitionName + ': ' + getCategoryName(category?.id),
          label: competitionName + ': ' + getCategoryName(category?.id),
          children: <Flex> {getStandings(game.id, competition.id, category?.id, category.standings)}</Flex>,
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
      <Tabs defaultActiveKey="1" items={items} indicator={{ size: (origin) => origin - 16 }} />
    </>
  )
}
