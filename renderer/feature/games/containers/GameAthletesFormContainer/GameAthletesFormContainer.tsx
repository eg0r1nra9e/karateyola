import { Button, Divider, Space, Tabs } from 'antd'
import { FC, useState } from 'react'

import { Category, Competition } from '@prisma/client'

import { AthleteWithTeamAndCity } from '../../../../types/AthleteWithTeamAndCity'
import { GameWithAll } from '../../../../types/GameWithAll'
import { GameAthletesTable } from '../../components/GameAthletesTable/GameAthletesTable'

interface IGameAthletesFormContainerProps {
  game: GameWithAll
  competitions: Competition[]
  categories: Category[]
  athletes: AthleteWithTeamAndCity[]
  onFinish: (values: any) => void
  onBack: (values: any) => void
}

export const GameAthletesFormContainer: FC<IGameAthletesFormContainerProps> = (props) => {
  const { game, competitions, categories, athletes, onFinish, onBack } = props

  const [currentGame, setCurrentGame] = useState(game)

  const items = []

  const onChange = (competitionId: number, categoryId: Number, athletesIds: number[]) => {
    const newGame = { ...currentGame }
    const competition = newGame.competitions.find((competition) => competition.id === competitionId)
    const category = competition.categories.find((category) => category.id === categoryId)

    const athletes = athletesIds.map((athlete) => ({ id: athlete }) as any)
    category.athletes = athletes

    setCurrentGame({ ...currentGame })
  }

  const getCategoryName = (categoryId) => {
    return categories.find((category) => category.id === categoryId)?.name
  }

  currentGame?.competitions.forEach((competition) => {
    const competitionName = competitions?.find((c) => c.id === competition.id)?.name
    if (competition?.categories?.length) {
      competition?.categories.forEach((category) => {
        items.push({
          key: competitionName + ': ' + getCategoryName(category?.id),
          label: competitionName + ': ' + getCategoryName(category?.id),
          children: (
            <GameAthletesTable competition={competition} category={category} athletes={athletes} onChange={onChange} />
          ),
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
          Продолжить
        </Button>
        <Button htmlType="button" onClick={onBack}>
          Назад
        </Button>
      </Space>
    </>
  )
}
