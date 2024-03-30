import { Button, Divider, Space, Tabs } from 'antd'
import { FC, useState } from 'react'

import { GameDuelsComponent } from '../../components/GameDuelsComponent/GameDuelsComponent'
import { useAppSelector } from '../../store/hooks'
import { selectAthletes } from '../../store/slices/athletesSlice'
import { selectCompetitions } from '../../store/slices/competitionsSlice'
import { selectCategories } from '../../store/slices/categoriesSlice'
import { selectTeams } from '../../store/slices/teamsSlice'
import { IGame } from '../../types/IGame'

interface IGameFormStandingsContainerProps {
  game: IGame
  onFinish: (values: any) => void
  onBack: (values: any) => void
}

export const GameFormStandingsContainer: FC<IGameFormStandingsContainerProps> = (props) => {
  const { game, onFinish, onBack } = props
  const athletes = useAppSelector(selectAthletes)
  const teams = useAppSelector(selectTeams)
  const competitions = useAppSelector(selectCompetitions)
  const categories = useAppSelector(selectCategories)
  const [currentGame, setCurrentGame] = useState(game)

  const items = []

  const getCategoryName = (categoryId) => {
    return categories.find((category) => category.id === categoryId)?.name
  }

  currentGame?.competitions.forEach((competition) => {
    const competitionName = competitions?.find((c) => c.id === competition.id)?.name
    if (competition?.categories?.length) {
      competition?.categories.forEach((category) => {
        if (!category?.standings?.length) {
          return null
        }
        items.push({
          key: category.id,
          label: competitionName + ': ' + getCategoryName(category?.id),
          children: <GameDuelsComponent athletes={athletes} teams={teams} standings={category.standings} />,
        })
      })
    }
  })

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} indicator={{ size: (origin) => origin - 16 }} />
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
