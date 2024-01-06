import { Button, Collapse, Divider, Space } from 'antd'
import { FC, useState } from 'react'

import { useAppSelector } from '../../store/hooks'
import { selectAthletes } from '../../store/slices/athletesSlice'
import { selectCompetitions } from '../../store/slices/competitionsSlice'
import { selectTeams } from '../../store/slices/teamsSlice'
import { IGame } from '../../types/IGame'
import { GameDuelsComponent } from '../GameDuelsComponent/GameDuelsComponent'

interface IGameStandingsContainerProps {
  game: IGame
  onFinish: (values: any) => void
  onBack: (values: any) => void
}

export const GameStandingsContainer: FC<IGameStandingsContainerProps> = (props) => {
  const { game, onFinish, onBack } = props
  const athletes = useAppSelector(selectAthletes)
  const teams = useAppSelector(selectTeams)
  const competitions = useAppSelector(selectCompetitions)
  const [currentGame, setCurrentGame] = useState(game)

  const items = []

  currentGame?.competitions.forEach((competition) => {
    const competitionName = competitions?.find((c) => c.id === competition.competitionId)?.name
    if (competition?.categories?.length) {
      competition?.categories.forEach((category) => {
        items.push({
          key: category.name,
          label: competitionName + ': ' + category?.name,
          children: <GameDuelsComponent athletes={athletes} teams={teams} standings={category.standings} />,
        })
      })
    }
  })

  return (
    <>
      <Collapse items={items} />
      <Divider />
      <Space size={8}>
        <Button type="primary" htmlType="submit" onClick={() => onFinish(currentGame)}>
          Завершить
        </Button>
        <Button htmlType="button" onClick={onBack}>
          Назад
        </Button>
      </Space>
    </>
  )
}
