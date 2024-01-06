import { Button, Card } from 'antd'
import { FC, ReactNode } from 'react'

import { IAthlete } from '../../types/IAthlete'
import { ITeam } from '../../types/ITeam'
import { IDuel } from '../../types/IDuel'
import { EditOutlined, EllipsisOutlined, FireOutlined, SettingOutlined } from '@ant-design/icons'
import Link from 'next/link'

interface IGameDuelsComponentProps {
  standings: IDuel[]
  athletes: IAthlete[]
  teams: ITeam[]
  actions?: ReactNode[]
}
export const GameDuelsComponent: FC<IGameDuelsComponentProps> = (props) => {
  const { standings, athletes, teams, actions } = props

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
    <Card key={standing?.id} actions={actions}>
      <Card>{getAthlete(standing?.athletesId[0])}</Card>
      {standing?.athletesId[1] && <Card>{getAthlete(standing?.athletesId[1])}</Card>}
    </Card>
  ))
}
