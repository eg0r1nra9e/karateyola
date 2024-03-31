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
    return <Flex vertical >
        <Typography.Title level={1} style={{ marginTop: 0, width: '100%', fontSize: '10em', }}>
        Победитель: {getAthlete(currentDuel.result)}
        </Typography.Title>
      </Flex>
  }

  if (!isBrowser) {
    return null
  }

  return (
    <Flex vertical>
      <Flex style={{ justifyContent: 'center' }}>
        
        <Typography.Title level={2} style={{ margin: 0, marginRight: '25px' }}>{currentDuel.competitionName}</Typography.Title>
        <Typography.Title level={2} style={{ margin: 0 }}>{currentDuel.categoryName}</Typography.Title>
        
      </Flex>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Typography.Title level={1} style={{ marginTop: 0, width: '50%', fontSize: '3em' }} type="danger">
          {getAthlete(currentDuel?.playerOne?.athleteId)}
        </Typography.Title>
        <Typography.Title level={1} style={{ margin: 1, width: '50%', color: 'blue', textAlign: 'right', fontSize: '3em' }}>
          {getAthlete(currentDuel?.playerTwo?.athleteId)}
        </Typography.Title>
      </Flex>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Typography.Title level={1} style={{ margin: 0, width: '25%', fontSize: '35em', whiteSpace: 'nowrap' }} type="danger">
          {currentDuel?.playerOne?.score}{currentDuel?.playerOne?.benefit ? '`' : null}
        </Typography.Title>
        <Typography.Title level={1} style={{ margin: 0, width: '50%', textAlign: 'center', fontSize: '15em' }}>
          {minutesString} : {secondsString}
        </Typography.Title>
        <Typography.Title
          level={1}
          style={{ margin: 0, width: '25%', color: 'blue', textAlign: 'right', fontSize: '35em', whiteSpace: 'nowrap' }}
        >
          {currentDuel?.playerTwo?.benefit ? '`' : null}{currentDuel?.playerTwo?.score}
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
      <Flex style={{ justifyContent: 'space-between' }}>&nbsp;</Flex>
    </Flex>
  )
}
