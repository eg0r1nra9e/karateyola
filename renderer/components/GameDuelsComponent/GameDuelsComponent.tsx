import { Card } from 'antd'
import { FC } from 'react'

import { IAthlete } from '../../types/IAthlete'
import { IStanding } from '../../types/IStanding'
import { ITeam } from '../../types/ITeam'

interface IGameDuelsComponentProps {
  standings: IStanding[]
  athletes: IAthlete[]
  teams: ITeam[]
}

export const GameDuelsComponent: FC<IGameDuelsComponentProps> = (props) => {
  const { standings, athletes, teams } = props

  if (!standings || !standings.length) {
    return null
  }

  const getAthlete = (athleteId) => {
    const athlete = athletes.find((a) => a.id === athleteId)
    const team = teams.find((t) => t.id === athlete.teamId)
    const athleteName = `${athlete.firstName} ${athlete.lastName}`
    let athleteTeam = ''
    if (team) {
      athleteTeam = ` (${team?.name}, ${team.cityId})`
    }
    return `${athleteName}${athleteTeam}`
  }

  return (
    <>
      {standings.map((standing) => (
        <Card key={standing?.id}>
          {standing?.duels?.map((duel) => (
            <Card key={duel?.id}>
              {duel.athletesId.map((athleteId) => (
                <Card key={athleteId}>{getAthlete(athleteId)}</Card>
              ))}
            </Card>
          ))}
        </Card>
      ))}
    </>
  )
}
