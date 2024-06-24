import { Tabs, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'

import { Category, Competition } from '@prisma/client'

import { AthleteWithTeamAndCity } from '../../../../types/AthleteWithTeamAndCity'
import { GameCompetitionWithCategoryAndAthletes } from '../../../../types/GameCompetitionWithCategoryAndAthletes'
import { GameWithAll } from '../../../../types/GameWithAll'
import { GameAthletesFormContainer } from '../../containers/GameAthletesFormContainer/GameAthletesFormContainer'
import { GameCompetitionsFormContainer } from '../../containers/GameCompetitionsFormContainer/GameCompetitionsFormContainer'
import { GameFormStandingsContainer } from '../../containers/GameFormStandingsContainer/GameFormStandingsContainer'
import { GameGeneralInformationFormContainer } from '../../containers/GameGeneralInformationFormContainer/GameGeneralInformationFormContainer'

interface IGameFormProps {
  gameId?: number
  game?: GameWithAll
  gameCompetitions: GameCompetitionWithCategoryAndAthletes[]
  competitions: Competition[]
  categories: Category[]
  athletes: AthleteWithTeamAndCity[]
  onSave: (values: any) => void
  onFinish: (values: any) => void
}

export const GameForm: FC<IGameFormProps> = (props) => {
  const { gameId, game, competitions, categories, gameCompetitions, athletes, onSave, onFinish } = props

  const [currentGame, setCurrentGame] = useState(game)

  const [currentGameId, setCurrentGameId] = useState(gameId)

  useEffect(() => {
    setCurrentGame(game)
  }, [game])

  useEffect(() => {
    setCurrentGameId(gameId)
  }, [gameId])

  const onFinishAthletesForm = (updateGame: GameWithAll) => {
    const newGame = {
      ...currentGame,
      ...updateGame,
    }

    setCurrentGame(newGame)
    onSave(newGame)
  }

  const onFinishForm = () => {
    onFinish(currentGame)
  }

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
              <GameAthletesFormContainer gameId={currentGameId} key="gameAthletesFormContainer" game={currentGame} />
            </>
          ),
        },
        {
          key: '4',
          label: 'Турнирная таблица',
          children: (
            <>
              <h2>Турнирная таблица</h2>
              <GameFormStandingsContainer key="gameStandingsContainer" game={currentGame} onFinish={onFinishForm} />
            </>
          ),
        },
      ],
    )
  }
  const forms = [
    <>
      <Typography.Title level={2}>Общая информация</Typography.Title>
      <GameGeneralInformationFormContainer key="gameGeneralInformationForm" gameId={currentGameId} />
    </>,
    <>
      <h2>Дисциплины и категории</h2>
      <GameCompetitionsFormContainer gameId={currentGameId}></GameCompetitionsFormContainer>
    </>,
    <>
      <h2>Спортсмены</h2>
      <GameAthletesFormContainer
        key="gameAthletesFormContainer"
        game={currentGame}
        competitions={competitions}
        categories={categories}
        athletes={athletes}
        onFinish={onFinishAthletesForm}
      />
    </>,
    <>
      <h2>Турнирная таблица</h2>
      <GameFormStandingsContainer key="gameStandingsContainer" game={currentGame} onFinish={onFinishForm} />
    </>,
  ]

  return (
    <>
      <Tabs items={items}></Tabs>
    </>
  )
}
