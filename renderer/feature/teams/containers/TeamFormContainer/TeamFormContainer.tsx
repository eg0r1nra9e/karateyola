import { App } from 'antd'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { City } from '@prisma/client'

import { TeamWithCity } from '../../../../types/TeamWithCity'
import { TeamForm } from '../../components/TeamForm/TeamForm'

interface ITeamFormProps {
  teamId?: string
}

export const TeamFormContainer: FC<ITeamFormProps> = (props) => {
  const { teamId } = props
  const { push } = useRouter()

  const { notification } = App.useApp()

  const [team, setTeam] = useState<TeamWithCity>()
  const [cities, setCities] = useState<City[]>([])

  const fetchData = async () => {
    const tasks = [
      async () => {
        const resCities = await fetch('/api/cities')
        const cities = await resCities.json()
        setCities(cities)
      },
      async () => {
        if (teamId) {
          const resTeam = await fetch(`/api/teams/${teamId}`)
          const team = await resTeam.json()
          setTeam(team)
        }
      },
    ]
    await Promise.all(tasks.map((p) => p()))
  }

  const onFinish = async (team: TeamWithCity) => {
    try {
      if (!teamId) {
        await fetch('/api/teams/create', {
          body: JSON.stringify(team),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
      } else {
        await fetch(`/api/teams/${teamId}`, {
          body: JSON.stringify(team),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        })
      }

      notification.success({
        message: `Сохранение`,
        description: 'Команда сохранена',
      })
    } catch (error) {
      notification.error({
        message: `Сохранение`,
        description: 'При сохранении произошла ошибка.',
      })
    }

    push('/teams/')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <TeamForm team={team} cities={cities} onFinish={onFinish} />
    </>
  )
}
