import { Card } from 'antd'
import { FC } from 'react'

import { StandingWithDuel } from '../../../../types/StandingWithDuel'

interface IGameDuelsComponentProps {
  standings: StandingWithDuel[]
}

export const GameDuelsComponent: FC<IGameDuelsComponentProps> = (props) => {
  const { standings } = props

  if (!standings || !standings.length) {
    return null
  }

  return (
    <>
      {standings.map((standing) => (
        <Card key={standing?.id}>
          {standing?.duels?.map((duel) => (
            <Card key={duel?.id}>
              <Card key={duel.firstPlayerId}>
                {duel.firstPlayer.firstName} {duel.firstPlayer.lastName} {duel.firstPlayer.team?.name}{' '}
                {duel.firstPlayer.team?.city?.city}
              </Card>
              <Card key={duel.secondPlayerId}>
                {duel.secondPlayer?.firstName} {duel.secondPlayer?.lastName} {duel.secondPlayer?.team?.name}{' '}
                {duel.secondPlayer?.team?.city?.city}
              </Card>
            </Card>
          ))}
        </Card>
      ))}
    </>
  )
}
