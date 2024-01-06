import { Button, Divider, Flex } from 'antd'
import { FC, useEffect, useState } from 'react'

import Player from '../../components/Player'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectAthletes } from '../../store/slices/athletesSlice'
import { selectCompetitions } from '../../store/slices/competitionsSlice'
import {
  addBenefitOne,
  addBenefitTwo,
  addDuel,
  addFailOne,
  addFailTwo,
  addScoreOne,
  addScoreTwo,
  endDuel,
  selectCurrentDuel,
  setTime,
} from '../../store/slices/currentDuelSlice'
import { selectGame } from '../../store/slices/gamesSlice'
import { selectTeams } from '../../store/slices/teamsSlice'
import { DuelResultContainer } from '../DuelResultContainer/DuelResultContainer'

interface IDuelContainer {
  gameId: string
  competitionId: string
  categoryName: string
  duelId: string
}

const TIMER = 30

export const DuelContainer: FC<IDuelContainer> = (props) => {
  const [isBrowser, setIsBrowser] = useState(false)

  const { gameId, competitionId, categoryName, duelId } = props
  const game = useAppSelector((state) => selectGame(state, gameId))
  const competitions = useAppSelector(selectCompetitions)
  const athletes = useAppSelector(selectAthletes)
  const teams = useAppSelector(selectTeams)
  const competitionName = competitions?.find((c) => c.id === competitionId)?.name
  const competition = game?.competitions?.find((c) => c.id === competitionId)
  const category = competition?.categories.find((c) => c.name === categoryName)
  const standing = category?.standings.find((c) => c.id === duelId)

  const [timer, setTimer] = useState(TIMER)
  const [timeInterval, setTimeInterval] = useState(null)
  const [isStartTimer, setIsStartTimer] = useState(false)

  const dispatch = useAppDispatch()

  const startTimer = () => {
    // Use setInterval to update the timer every 1000 milliseconds (1 second)
    setTimeInterval(
      setInterval(() => {
        // Update the timer by incrementing the previous value by 1
        setTimer((prev) => Math.max(prev - 1, 0))
      }, 1000),
    )
    setIsStartTimer(true)
  }

  const pauseTimer = () => {
    setIsStartTimer(false)
    clearInterval(timeInterval)
  }

  // Function to reset the timer
  const resetTimer = () => {
    // Reset the timer value to 0
    setTimer(TIMER)
    setIsStartTimer(false)
    // Clear the interval to stop the timer
    clearInterval(timeInterval)
  }

  useEffect(() => {
    if (timer) {
      dispatch(setTime(timer))
    } else {
      dispatch(endDuel())
    }
  }, [dispatch, timer])

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  useEffect(() => {
    dispatch(
      addDuel({
        id: duelId,
        competitionName,
        categoryName,
        timer: TIMER,
        playerOne: {
          id: standing?.athletesId[0],
          athleteId: standing?.athletesId[0],
          benefit: 0,
          fail: 0,
          score: 0,
        },
        playerTwo: {
          id: standing?.athletesId[1] || null,
          athleteId: standing?.athletesId[1] || null,
          benefit: 0,
          fail: 0,
          score: 0,
        },
        result: null,
      }),
    )
  }, [duelId, dispatch, standing?.athletesId, categoryName, competitionName])

  const getAthlete = (athleteId) => {
    const athlete = athletes.find((a) => a.id === athleteId)
    const team = teams.find((t) => t.id === athlete.teamId)
    const athleteName = `${athlete.firstName} ${athlete.lastName}`
    let athleteTeam = ''
    if (team) {
      athleteTeam = ` (${team?.name}, ${team.city})`
    }
    return `${athleteName}${athleteTeam}`
  }

  const clickAddBenefitOne = () => {
    pauseTimer()
    dispatch(addBenefitOne(1))
  }
  const clickRemoveBenefitOne = () => {
    pauseTimer()
    dispatch(addBenefitOne(-1))
  }

  const clickCountOne = (count: number) => {
    pauseTimer()
    dispatch(addScoreOne(count))
  }

  if (!isBrowser) {
    return null
  }

  return (
    <>
      <h1>{game?.name}</h1>
      <h2>
        {competitionName}, {categoryName}
      </h2>
      <h3> Спортсмены: {standing?.athletesId?.map((a) => getAthlete(a)).join(', ')}</h3>
      <Flex gap="middle">
        {!isStartTimer ? (
          <Button onClick={startTimer} style={{ width: '100%' }} type="primary">
            Старт
          </Button>
        ) : (
          <Button onClick={pauseTimer} style={{ width: '100%' }} type="primary">
            Пауза
          </Button>
        )}

        <Button onClick={resetTimer} style={{ width: '100%' }} type="primary" danger>
          Reset
        </Button>
      </Flex>
      <Divider />
      <Flex gap="middle">
        <div style={{ background: 'red', width: '100%' }}>
          <Player
            isDanger={true}
            addBenefits={clickAddBenefitOne}
            removeBenefits={clickRemoveBenefitOne}
            setCount={clickCountOne}
            setCountFail={(count) => {}}
            setCountFail2={(count) => {}}
          />
        </div>
        <div style={{ background: 'blue', width: '100%' }}>2</div>
      </Flex>
      <Divider />
      <DuelResultContainer />
    </>
  )
}
