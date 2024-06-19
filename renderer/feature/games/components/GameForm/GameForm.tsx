import { Divider, Steps } from 'antd'
import { FC, useEffect, useState } from 'react'

import { ApartmentOutlined, ProfileOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons'
import { Category, Competition } from '@prisma/client'

import { AthleteWithTeamAndCity } from '../../../../types/AthleteWithTeamAndCity'
import { GameWithAll } from '../../../../types/GameWithAll'
import { GameAthletesFormContainer } from '../../containers/GameAthletesFormContainer/GameAthletesFormContainer'
import { GameFormStandingsContainer } from '../../containers/GameFormStandingsContainer/GameFormStandingsContainer'
import { GameCompetitionsForm } from '../GameCompetitionsForm/GameCompetitionsForm'
import { GameGeneralInformationForm } from '../GameGeneralInformationForm/GameGeneralInformationForm'

interface IGameFormProps {
  game?: GameWithAll
  competitions: Competition[]
  categories: Category[]
  athletes: AthleteWithTeamAndCity[]
  onSave: (values: any) => void
  onFinish: (values: any) => void
}

export const GameForm: FC<IGameFormProps> = (props) => {
  const { game, competitions, categories, athletes, onSave, onFinish } = props

  const [currentGame, setCurrentGame] = useState(game)
  useEffect(() => {
    debugger
    setCurrentGame(game)
  }, [game])

  const [currentStep, setCurrentStep] = useState(0)

  const onFinishGeneralForm = (updateGame: GameWithAll) => {
    setCurrentGame({
      ...currentGame,
      ...updateGame,
    })
    setCurrentStep(1)
  }

  const onFinishCompetitionsForm = (updateGame: GameWithAll) => {
    setCurrentGame({
      ...currentGame,
      ...updateGame,
    })
    setCurrentStep(2)
  }

  const onFinishAthletesForm = (updateGame: GameWithAll) => {
    debugger
    const newGame = {
      ...currentGame,
      ...updateGame,
    }

    setCurrentGame(newGame)
    onSave(newGame)
    setCurrentStep(3)
  }

  const onFinishForm = () => {
    onFinish(currentGame)
  }

  if (!currentGame) {
    return null
  }

  debugger
  const forms = [
    <>
      <h2>Общая информация</h2>
      <GameGeneralInformationForm key="gameGeneralInformationForm" game={currentGame} onFinish={onFinishGeneralForm} />
    </>,
    <>
      <h2>Дисциплины</h2>
      <GameCompetitionsForm
        key="gameCompetitionsForm"
        game={currentGame}
        competitions={competitions}
        categories={categories}
        onFinish={onFinishCompetitionsForm}
        onBack={() => {
          setCurrentStep(0)
        }}
      />
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
        onBack={() => {
          setCurrentStep(1)
        }}
      />
    </>,
    <>
      <h2>Турнирная таблица</h2>
      <GameFormStandingsContainer
        key="gameStandingsContainer"
        game={currentGame}
        onFinish={onFinishForm}
        onBack={() => {
          setCurrentStep(2)
        }}
      />
    </>,
  ]

  return (
    <>
      <Steps current={currentStep}>
        <Steps.Step title="Общая информация" icon={<TrophyOutlined />} />
        <Steps.Step title="Дисциплины" icon={<ProfileOutlined />} />
        <Steps.Step title="Спортсмены" icon={<TeamOutlined />} />
        <Steps.Step title="Турнирная таблица" icon={<ApartmentOutlined />} />
      </Steps>
      <Divider />
      {forms[currentStep]}
    </>
  )
}
