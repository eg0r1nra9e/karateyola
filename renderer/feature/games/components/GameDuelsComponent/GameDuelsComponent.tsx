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
              <Card key={duel.onePlayerId}>
                {duel.onePlayer.firstName} {duel.onePlayer.lastName} {duel.onePlayer.team?.name}{' '}
                {duel.onePlayer.team?.city?.city}
              </Card>
              <Card key={duel.twoPlayerId}>
                {duel.twoPlayer?.firstName} {duel.twoPlayer?.lastName} {duel.twoPlayer?.team?.name}{' '}
                {duel.twoPlayer?.team?.city?.city}
              </Card>
            </Card>
          ))}
        </Card>
      ))}
    </>
  )
}
