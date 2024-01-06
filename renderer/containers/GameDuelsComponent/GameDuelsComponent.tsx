import { Card } from 'antd'
import { FC } from 'react'

import { IAthlete } from '../../types/IAthlete'
import { IGame } from '../../types/IGame'
import { ITeam } from '../../types/ITeam'

interface IGameStandingsContainerProps {
  game: IGame
  onFinish: (values: any) => void
  onBack: (values: any) => void
}

interface IGameDuelsComponentProps {
  standings: string[][]
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
    <Card key={standing[0]}>
      <Card>{getAthlete(standing[0])}</Card>
      {standing[1] && <Card>{getAthlete(standing[1])}</Card>}
    </Card>
  ))
}
