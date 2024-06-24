import { Tabs, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'

import { GameAthletesFormContainer } from '../../containers/GameAthletesFormContainer/GameAthletesFormContainer'
import { GameCompetitionsFormContainer } from '../../containers/GameCompetitionsFormContainer/GameCompetitionsFormContainer'
import { GameFormStandingsContainer } from '../../containers/GameFormStandingsContainer/GameFormStandingsContainer'
import { GameGeneralInformationFormContainer } from '../../containers/GameGeneralInformationFormContainer/GameGeneralInformationFormContainer'

interface IGameFormProps {
  gameId?: number
}

export const GameForm: FC<IGameFormProps> = (props) => {
  const { gameId } = props

  const [currentGameId, setCurrentGameId] = useState(gameId)

  useEffect(() => {
    setCurrentGameId(gameId)
  }, [gameId])

  const items = [
    {
      key: '1',
      label: 'Общая информация',
      children: (
        <>
          <Typography.Title level={2}>Общая информация</Typography.Title>
          <GameGeneralInformationFormContainer key="gameGeneralInformationForm" gameId={currentGameId} />
        </>
      ),
    },
  ]

  if (gameId) {
    items.push(
      ...[
        {
          key: '2',
          label: 'Дисциплины и категории',
          children: (
            <>
              <h2>Дисциплины и категории</h2>
              <GameCompetitionsFormContainer gameId={currentGameId}></GameCompetitionsFormContainer>
            </>
          ),
        },
        {
          key: '3',
          label: 'Спортсмены',
          children: (
            <>
              <h2>Спортсмены</h2>
              <GameAthletesFormContainer gameId={currentGameId} key="gameAthletesFormContainer" />
            </>
          ),
        },
        {
          key: '4',
          label: 'Турнирная таблица',
          children: (
            <>
              <h2>Турнирная таблица</h2>
              <GameFormStandingsContainer key="gameStandingsContainer" gameId={currentGameId} />
            </>
          ),
        },
      ],
    )
  }

  return (
    <>
      <Tabs items={items} destroyInactiveTabPane={true}></Tabs>
    </>
  )
}
