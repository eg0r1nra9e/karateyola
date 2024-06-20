import { App } from 'antd'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { Competition } from '@prisma/client'

import { CompetitionForm } from '../../components/CompetitionForm/CompetitionForm'

interface ICompetitionFormProps {
  competitionId?: string
}

export const CompetitionFormContainer: FC<ICompetitionFormProps> = (props) => {
  const { competitionId } = props

  const { push } = useRouter()
  const { notification } = App.useApp()

  const [competition, setCompetition] = useState<Competition>()

  const fetchData = async () => {
    if (competitionId) {
      const resCompetition = await fetch(`/api/competitions/${competitionId}`)
      const competition = await resCompetition.json()
      setCompetition(competition)
    }
  }

  const onFinish = async (team: Competition) => {
    try {
      if (!competitionId) {
        await fetch('/api/competitions/create', {
          body: JSON.stringify(team),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
      } else {
        await fetch(`/api/competitions/${competitionId}`, {
          body: JSON.stringify(team),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        })
      }
      notification.success({
        message: `Сохранение`,
        description: 'Дисциплина сохранена',
      })
    } catch (error) {
      notification.error({
        message: `Сохранение`,
        description: 'При сохранении произошла ошибка.',
      })
    }

    push('/competitions/')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <CompetitionForm competition={competition} onFinish={onFinish} />
    </>
  )
}
