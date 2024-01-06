import { Button, Divider, Space, Tabs } from 'antd'
import { FC, useState } from 'react'

import { GameAthletesTable } from '../../components/GameAthletesTable/GameAthletesTable'
import { useAppSelector } from '../../store/hooks'
import { selectAthletes } from '../../store/slices/athletesSlice'
import { selectCompetitions } from '../../store/slices/competitionsSlice'
import { selectTeams } from '../../store/slices/teamsSlice'
import { IGame } from '../../types/IGame'
import { IGameCompetitionCategory } from '../../types/IGameCompetitionCategory'

interface IGameAthletesFormContainerProps {
  game: IGame
  onFinish: (values: any) => void
  onBack: (values: any) => void
}

export const GameAthletesFormContainer: FC<IGameAthletesFormContainerProps> = (props) => {
  const { game, onFinish, onBack } = props
  const athletes = useAppSelector(selectAthletes)
  const competitions = useAppSelector(selectCompetitions)
  const [currentGame, setCurrentGame] = useState(game)

  const teams = useAppSelector(selectTeams)

  const items = []

  const onChange = (category: IGameCompetitionCategory, athletesIds: string[]) => {
    if (!category.athletes?.length) {
      category.athletes = []
    }

    category.athletes = []

    category.athletes = [...athletesIds]

    setCurrentGame({ ...currentGame })
  }

  currentGame?.competitions.forEach((competition) => {
    const competitionName = competitions?.find((c) => c.id === competition.id)?.name
    if (competition?.categories?.length) {
      competition?.categories.forEach((category) => {
        items.push({
          key: category.name,
          label: competitionName + ': ' + category?.name,
          children: <GameAthletesTable category={category} athletes={athletes} teams={teams} onChange={onChange} />,
        })
      })
    }
  })

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} indicatorSize={(origin) => origin - 16} />
      <Divider />
      <Space size={8}>
        <Button type="primary" htmlType="submit" onClick={() => onFinish(currentGame)}>
          Продолжить
        </Button>
        <Button htmlType="button" onClick={onBack}>
          Назад
        </Button>
      </Space>
    </>
  )
}
