import { Button, Divider, Form, Space, Steps } from 'antd'
import React, { FC, useEffect, useState } from 'react'

import { ApartmentOutlined, ProfileOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons'

import { GameAthletesFormContainer } from '../../containers/GameAthletesFormContainer/GameAthletesFormContainer'
import { IAthlete } from '../../types/IAthlete'
import { ICompetition } from '../../types/ICompetition'
import { IGame } from '../../types/IGame'
import { GameCompetitionsForm } from '../GameCompetitionsForm/GameCompetitionsForm'
import { GameGeneralInformationForm } from '../GameGeneralInformationForm/GameGeneralInformationForm'

interface IGameFormProps {
  game?: IGame
  competitions: ICompetition[]
  athletes: IAthlete[]
  onFinish: (values: any) => void
}

export const GameForm: FC<IGameFormProps> = (props) => {
  const { game, competitions, athletes, onFinish } = props

  const [currentGame, setCurrentGame] = useState(game)

  const [current, setCurrent] = useState(0)

  const onFinishGeneralForm = (game: IGame) => {
    setCurrentGame({
      ...currentGame,
      ...game,
    })
    setCurrent(1)
  }

  const onFinishCompetitionsForm = (game: IGame) => {
    setCurrentGame({
      ...currentGame,
      ...game,
    })
    setCurrent(2)
  }

  const onFinishAthletesForm = (game: IGame) => {
    setCurrentGame({
      ...currentGame,
      ...game,
    })
    setCurrent(3)
  }

  const onFinishForm = () => {
    onFinish(currentGame)
  }

  const forms = [
    <GameGeneralInformationForm key="gameGeneralInformationForm" game={currentGame} onFinish={onFinishGeneralForm} />,
    <GameCompetitionsForm
      key="gameCompetitionsForm"
      game={currentGame}
      competitions={competitions}
      onFinish={onFinishCompetitionsForm}
      onBack={() => {
        setCurrent(0)
      }}
    />,
    <GameAthletesFormContainer
      key="gameAthletesFormContainer"
      game={currentGame}
      onFinish={onFinishAthletesForm}
      onBack={() => {
        setCurrent(1)
      }}
    />,
    <div key="finis">
      <Divider />
      <Space size={8}>
        <Button type="primary" htmlType="submit" onClick={onFinishForm}>
          Завершить
        </Button>
        <Button
          htmlType="button"
          onClick={() => {
            setCurrent(2)
          }}
        >
          Назад
        </Button>
      </Space>
    </div>,
  ]

  return (
    <>
      <Steps current={current}>
        <Steps.Step title="Общая информация" icon={<TrophyOutlined />} />
        <Steps.Step title="Дисциплины" icon={<ProfileOutlined />} />
        <Steps.Step title="Спортсмены" icon={<TeamOutlined />} />
        <Steps.Step title="Турнирная таблица" icon={<ApartmentOutlined />} />
      </Steps>
      <Divider />
      {forms[current]}
    </>
  )
}
