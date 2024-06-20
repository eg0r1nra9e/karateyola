import { App } from 'antd'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { Team } from '@prisma/client'

import { AthleteWithTeamAndCity } from '../../../../types/AthleteWithTeamAndCity'
import { AthleteForm } from '../../components/AthleteForm/AthleteForm'

interface IAthleteFormProps {
  athleteId?: string
}

export const AthleteFormContainer: FC<IAthleteFormProps> = (props) => {
  const { athleteId } = props
  const { push } = useRouter()
  const { notification } = App.useApp()

  const [athlete, setAthlete] = useState<AthleteWithTeamAndCity>()
  const [teams, setTeams] = useState<Team[]>([])

  const fetchData = async () => {
    const tasks = [
      async () => {
        const resTeams = await fetch('/api/teams')
        const teams: Team[] = await resTeams.json()
        setTeams(teams)
      },
      async () => {
        if (athleteId) {
          const resAthlete = await fetch(`/api/athletes/${athleteId}`)
          const athlete: AthleteWithTeamAndCity = await resAthlete.json()
          setAthlete(athlete)
        }
      },
    ]
    await Promise.all(tasks.map((p) => p()))
  }

  const onFinish = async (athlete: AthleteWithTeamAndCity) => {
    try {
      if (!athleteId) {
        await fetch('/api/athletes/create', {
          body: JSON.stringify(athlete),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
      } else {
        await fetch(`/api/athletes/${athleteId}`, {
          body: JSON.stringify(athlete),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        })
      }
      notification.success({
        message: `Сохранение`,
        description: 'Спортсмен сохранен',
      })
    } catch (error) {
      notification.error({
        message: `Сохранение`,
        description: 'При сохранении произошла ошибка.',
      })
    }

    push('/athletes/')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <AthleteForm athlete={athlete} teams={teams} onFinish={onFinish} />
    </>
  )
}
