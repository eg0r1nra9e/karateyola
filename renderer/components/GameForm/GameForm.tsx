import { Button, Divider, Form, Space, Steps } from 'antd'
import React, { FC, useEffect, useState } from 'react'

import { ApartmentOutlined, ProfileOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons'

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

  const [current, setCurrent] = useState(0)

  const [generalInformationDetail, setGeneralInformationDetail] = useState(game)

  const [competitionsDetail, setCompetitionsDetail] = useState(game)

  const onFinishGeneralForm = (game: IGame) => {
    setGeneralInformationDetail(game)
    setCurrent(1)
  }

  const onFinishCompetitionsForm = (game: IGame) => {
    setCompetitionsDetail(game)
    setCurrent(2)
  }

  const onFinishForm = () => {
    const game = { ...generalInformationDetail, competitions: competitionsDetail.competitions }
    onFinish(game)
  }

  const forms = [
    <GameGeneralInformationForm key="gameGeneralInformationForm" game={game} onFinish={onFinishGeneralForm} />,
    <GameCompetitionsForm
      key="gameCompetitionsForm"
      game={game}
      competitions={competitions}
      onFinish={onFinishCompetitionsForm}
      back={() => {
        setCurrent(0)
      }}
    />,
    <div key="athletes">
      Спортсмены
      <Space size={8}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            setCurrent(3)
          }}
        >
          Продолжить
        </Button>
        <Button
          htmlType="button"
          onClick={() => {
            setCurrent(1)
          }}
        >
          Назад
        </Button>
      </Space>
    </div>,
    <div key="finis">
      Конец
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
