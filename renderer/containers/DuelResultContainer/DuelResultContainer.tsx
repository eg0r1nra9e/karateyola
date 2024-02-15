import { Flex, Typography } from 'antd'

import { useAppSelector } from '../../store/hooks'
import { selectAthletes } from '../../store/slices/athletesSlice'
import { selectCurrentDuel } from '../../store/slices/currentDuelSlice'
import { selectTeams } from '../../store/slices/teamsSlice'
import { useEffect, useState } from 'react'
import { Violations } from '../../components/Violations/Violations'

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
    if (!athlete) {
      return null
    }

    const team = teams.find((t) => t.id === athlete?.teamId)
    const athleteName = `${athlete.firstName} ${athlete.lastName}`
    let athleteTeam = ''
    if (team) {
      athleteTeam = `(${team?.name}, ${team.city})`
    }
    return (
      <div>
        <div>{athleteName}</div>
        {athleteTeam || ''}
      </div>
    )
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
        <Typography.Title level={1} style={{ marginTop: 0, width: '50%' }} type="danger">
          {getAthlete(currentDuel?.playerOne?.athleteId)}
        </Typography.Title>
        <Typography.Title level={1} style={{ margin: 0, width: '50%', color: 'blue', textAlign: 'right' }}>
          {getAthlete(currentDuel?.playerTwo?.athleteId)}
        </Typography.Title>
      </Flex>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Typography.Title level={1} style={{ margin: 0, width: '25%', fontSize: '8rem' }} type="danger">
          {currentDuel?.playerOne?.score} {currentDuel?.playerOne?.benefit ? '`' : null}
        </Typography.Title>
        <Typography.Title level={1} style={{ margin: 0, width: '50%', textAlign: 'center', fontSize: '8rem' }}>
          {minutesString} : {secondsString}
        </Typography.Title>
        <Typography.Title
          level={1}
          style={{ margin: 0, width: '25%', color: 'blue', textAlign: 'right', fontSize: '8rem' }}
        >
          {currentDuel?.playerTwo?.benefit ? '`' : null} {currentDuel?.playerTwo?.score}
        </Typography.Title>
      </Flex>

      <Flex style={{ justifyContent: 'space-between' }}>
        <div style={{ margin: 0, width: '40%' }}>
          <Flex>
            <Violations type="Чуй" value={currentDuel?.playerOne?.fail} isDanger />
          </Flex>
        </div>
        <div style={{ margin: 0, width: '40%' }}></div>
        <div style={{ margin: 0, width: '40%' }}>
          <Violations type="Чуй" value={currentDuel?.playerTwo?.fail} />
        </div>
      </Flex>
      <Flex style={{ justifyContent: 'space-between' }}></Flex>
      <Flex style={{ justifyContent: 'space-between' }}>
        <div style={{ marginTop: 0, width: '100%' }}>
          <Typography.Title level={2}>{currentDuel.competitionName}</Typography.Title>
          <Typography.Title level={2}>{currentDuel.categoryName}</Typography.Title>
        </div>
      </Flex>
    </Flex>
  )
}
