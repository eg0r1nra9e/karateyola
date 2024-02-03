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
  addFailOne2,
  addFailTwo2,
  addScoreOne,
  addScoreTwo,
  endDuel,
  selectCurrentDuel,
  setTime,
} from '../../store/slices/currentDuelSlice'
import { selectGame, setWinner } from '../../store/slices/gamesSlice'
import { selectTeams } from '../../store/slices/teamsSlice'
import { DuelResultContainer } from '../DuelResultContainer/DuelResultContainer'

interface IDuelContainer {
  gameId: string
  competitionId: string
  categoryName: string
  standingId: string
  duelId: string
}

export const DuelContainer: FC<IDuelContainer> = (props) => {
  const [isBrowser, setIsBrowser] = useState(false)

  const { gameId, competitionId, categoryName, standingId, duelId } = props
  const game = useAppSelector((state) => selectGame(state, gameId))
  const competitions = useAppSelector(selectCompetitions)
  const athletes = useAppSelector(selectAthletes)
  const teams = useAppSelector(selectTeams)
  const competitionName = competitions?.find((c) => c.id === competitionId)?.name
  const competition = game?.competitions?.find((c) => c.id === competitionId)
  const category = competition?.categories.find((c) => c.name === categoryName)
  const standing = category?.standings.find((c) => c.id === standingId)
  const duel = standing?.duels.find((c) => c.id === duelId)

  const currentDuel = useAppSelector(selectCurrentDuel)

  const [timer, setTimer] = useState(category.time)
  const [timeInterval, setTimeInterval] = useState(null)
  const [isStartTimer, setIsStartTimer] = useState(false)

  const dispatch = useAppDispatch()

  const startTimer = () => {
    setTimeInterval(
      setInterval(() => {
        setTimer((prev) => Math.max(prev - 1, 0))
      }, 1000),
    )
    setIsStartTimer(true)
  }

  const pauseTimer = () => {
    setIsStartTimer(false)
    clearInterval(timeInterval)
  }

  const resetTimer = (secund = category.time) => {
    setTimer(secund)
    setIsStartTimer(false)
    clearInterval(timeInterval)
  }

  useEffect(() => {
    if (timer) {
      dispatch(setTime(timer))
    } else {
      if (currentDuel.playerOne.score === currentDuel.playerTwo.score) {
        resetTimer(category.time)
        return
      }
      // Конец боя
      const winner =
        currentDuel.playerOne.score > currentDuel.playerTwo.score
          ? currentDuel.playerOne.athleteId
          : currentDuel.playerTwo.athleteId

      dispatch(endDuel(winner))
      dispatch(
        setWinner({
          gameId,
          competitionId,
          categoryName,
          standingId,
          duelId,
          athleteId: winner,
        }),
      )
    }
  }, [timer])

  useEffect(() => {
    setIsBrowser(true)
    window.open('/current-result', '_blank', 'contextIsolation=no,nodeIntegration=yes')
  }, [])

  useEffect(() => {
    dispatch(
      addDuel({
        id: duelId,
        competitionName,
        categoryName,
        timer: category.time,
        playerOne: {
          id: duel?.athletesId[0],
          athleteId: duel?.athletesId[0],
          benefit: 0,
          fail: 0,
          fail2: 0,
          score: 0,
        },
        playerTwo: {
          id: duel?.athletesId[1] || null,
          athleteId: duel?.athletesId[1] || null,
          benefit: 0,
          fail: 0,
          fail2: 0,
          score: 0,
        },
        result: null,
      }),
    )
  }, [duelId, dispatch, duel, categoryName, competitionName])

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

  const clickAddBenefitTwo = () => {
    pauseTimer()
    dispatch(addBenefitTwo(1))
  }
  const clickRemoveBenefitTwo = () => {
    pauseTimer()
    dispatch(addBenefitTwo(-1))
  }

  const clickAddFailTwo = () => {
    pauseTimer()
    dispatch(addFailTwo(1))
  }
  const clickRemoveFailTwo = () => {
    pauseTimer()
    dispatch(addFailTwo(-1))
  }

  const clickAddFailOne = () => {
    pauseTimer()
    dispatch(addFailOne2(1))
  }
  const clickRemoveFailOne = () => {
    pauseTimer()
    dispatch(addFailOne(-1))
  }

  const clickAddFailTwo2 = () => {
    pauseTimer()
    dispatch(addFailTwo2(1))
  }
  const clickRemoveFailTwo2 = () => {
    pauseTimer()
    dispatch(addFailTwo2(-1))
  }

  const clickAddFailOne2 = () => {
    pauseTimer()
    dispatch(addFailOne2(1))
  }
  const clickRemoveFailOne2 = () => {
    pauseTimer()
    dispatch(addFailOne2(-1))
  }

  const clickCountTwo = (count: number) => {
    pauseTimer()
    dispatch(addScoreTwo(count))
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
      <h3> Спортсмены: {duel?.athletesId?.map((a) => getAthlete(a)).join(', ')}</h3>
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

        <Button onClick={() => resetTimer()} style={{ width: '100%' }} type="primary" danger>
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
        <div style={{ background: 'blue', width: '100%' }}>
          <Player
            isDanger={false}
            addBenefits={clickAddBenefitTwo}
            removeBenefits={clickRemoveBenefitTwo}
            setCount={clickCountTwo}
            setCountFail={(count) => {}}
            setCountFail2={(count) => {}}
          />
        </div>
      </Flex>
      <Divider />
      <DuelResultContainer />
    </>
  )
}
