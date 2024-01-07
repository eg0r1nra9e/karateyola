import { Flex, Typography } from 'antd'

import { useAppSelector } from '../../store/hooks'
import { selectAthletes } from '../../store/slices/athletesSlice'
import { selectCurrentDuel } from '../../store/slices/currentDuelSlice'
import { selectTeams } from '../../store/slices/teamsSlice'
import { useEffect, useState } from 'react'

export const DuelResultContainer = () => {
  const [isBrowser, setIsBrowser] = useState(false)

  const athletes = useAppSelector(selectAthletes)
  const teams = useAppSelector(selectTeams)
  const currentDuel = useAppSelector(selectCurrentDuel)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const getAthlete = (athleteId) => {
    if (!athleteId) {
      return ''
    }
    const athlete = athletes.find((a) => a.id === athleteId)
    const team = teams.find((t) => t.id === athlete.teamId)
    const athleteName = `${athlete.firstName} ${athlete.lastName}`
    let athleteTeam = ''
    if (team) {
      athleteTeam = ` (${team?.name}, ${team.city})`
    }
    return `${athleteName}${athleteTeam}`
  }

  const minutesString = String(Math.floor(currentDuel.timer / 60)).padStart(2, '0')
  const secondsString = String(currentDuel.timer % 60).padStart(2, '0')

  if (currentDuel.result) {
    return <div>Конец боя</div>
  }

  if (!isBrowser) {
    return null
  }

  return (
    <Flex vertical>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Typography.Title level={1} style={{ marginTop: 0, width: '80%' }}>
          {getAthlete(currentDuel?.playerOne?.athleteId)}
        </Typography.Title>
        <Typography.Title level={1} style={{ marginTop: 0, width: '20%' }} type="danger">
          {currentDuel?.playerOne?.score}
        </Typography.Title>
      </Flex>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Typography.Title level={1} style={{ marginTop: 0, width: '80%' }}>
          {getAthlete(currentDuel?.playerTwo?.athleteId)}
        </Typography.Title>

        <Typography.Title level={1} style={{ marginTop: 0, color: 'blue', width: '20%' }}>
          {currentDuel?.playerTwo?.score}
        </Typography.Title>
      </Flex>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Typography.Title level={1} style={{ marginTop: 0, textAlign: 'center', width: '100%' }}>
          {minutesString} : {secondsString}
        </Typography.Title>
        <div style={{ marginTop: 0, width: '100%' }}>
          <Typography.Title level={2}>{currentDuel.competitionName}</Typography.Title>
          <Typography.Title level={2}>{currentDuel.categoryName}</Typography.Title>
        </div>
      </Flex>
    </Flex>
  )
}
