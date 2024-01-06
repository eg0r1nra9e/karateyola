import { Card } from 'antd'
import { FC } from 'react'

import { IAthlete } from '../../types/IAthlete'
import { ITeam } from '../../types/ITeam'
import { IDuel } from '../../types/IDuel'

interface IGameDuelsComponentProps {
  standings: IDuel[]
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
      athleteTeam = ` (${team?.name}, ${team.city})`
    }
    return `${athleteName}${athleteTeam}`
  }

  return standings.map((standing) => (
    <Card key={standing?.id}>
      <Card>{getAthlete(standing?.athletesId[0])}</Card>
      {standing?.athletesId[1] && <Card>{getAthlete(standing?.athletesId[1])}</Card>}
    </Card>
  ))
}
