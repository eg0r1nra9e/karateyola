import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { AthleteForm } from '../../components/AthleteForm/AthleteForm'
import { AthleteWithTeamAndCity } from '../../types/TeamWithCity copy'

interface IAthleteFormProps {
  athleteId?: string
}

export const AthleteFormContainer: FC<IAthleteFormProps> = (props) => {
  const { athleteId } = props
  const { push } = useRouter()

  const [athlete, setAthlete] = useState({})
  const [teams, setTeams] = useState([])

  const fetchData = async () => {
    const tasks = [
      async () => {
        const resTeams = await fetch('/api/teams')
        const teams = await resTeams.json()
        setTeams(teams)
      },
      async () => {
        if (athleteId) {
          const resAthlete = await fetch(`/api/athletes/${athleteId}`)
          const athlete = await resAthlete.json()
          setAthlete(athlete)
        }
      },
    ]
    await Promise.all(tasks.map((p) => p()))
  }

  const onFinish = async (athlete: AthleteWithTeamAndCity) => {
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

    push('/athletes/')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <AthleteForm athlete={athlete} teams={teams} onFinish={onFinish} />
}
