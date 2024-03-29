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
import { selectGame, setWinner } from '../../store/slices/gamesSlice'
import { selectTeams } from '../../store/slices/teamsSlice'
import { DuelResultContainer } from '../DuelResultContainer/DuelResultContainer'
import { useRouter } from 'next/router'
import { time } from '../CategoriesContainer/CategoriesContainer'
import { additionTime } from '../CategoriesContainer/CategoriesContainer'

interface IDuelContainer {
  gameId: string
  competitionId: string
  categoryId: string
  standingId: string
  duelId: string
}

export const DuelContainer: FC<IDuelContainer> = (props) => {
  const { push } = useRouter()

  const [isBrowser, setIsBrowser] = useState(false)

  const { gameId, competitionId, categoryId, standingId, duelId } = props
  const game = useAppSelector((state) => selectGame(state, gameId))
  const competitions = useAppSelector(selectCompetitions)
  const athletes = useAppSelector(selectAthletes)
  const teams = useAppSelector(selectTeams)
  const competitionName = competitions?.find((c) => c.id === competitionId)?.name
  const competition = game?.competitions?.find((c) => c.id === competitionId)
  const categoryName = competition?.categories.find((c) => c.id === categoryId)?.name
  const category = game?.categories?.find((c) => c.id === categoryId)
  const standing = category?.standings.find((c) => c.id === standingId)
  const duel = standing?.duels.find((c) => c.id === duelId)

  const currentDuel = useAppSelector(selectCurrentDuel)

  const [timer, setTimer] = useState(category?.time)
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

  const resetTimer = (secund = time) => {
    setTimer(secund)
    setIsStartTimer(false)
    clearInterval(timeInterval)
  }

  useEffect(() => {
    if (timer) {
      dispatch(setTime(timer))
    } else {
      if (currentDuel.playerOne.score === currentDuel.playerTwo.score) {
        resetTimer(additionTime)
        return
      }
      // Конец боя
      const winner =
        currentDuel.playerOne.score > currentDuel.playerTwo.score
          ? currentDuel.playerOne.athleteId
          : currentDuel.playerTwo.athleteId

      dispatch(endDuel(winner))
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

  const clickAddBenefitTwo = () => {
    pauseTimer()
    dispatch(addBenefitTwo(1))
  }
  const clickRemoveBenefitTwo = () => {
    pauseTimer()
    dispatch(addBenefitTwo(-1))
  }

  const clickCountOne = (count: number) => {
    pauseTimer()
    dispatch(addScoreOne(count))
  }

  const clickCountTwo = (count: number) => {
    pauseTimer()
    dispatch(addScoreTwo(count))
  }

  const clickAddFailOne = (value) => {
    pauseTimer()
    dispatch(addFailOne(value))
  }

  const clickAddFailTwo = (value) => {
    pauseTimer()
    dispatch(addFailTwo(value))
  }

  const clickWinnerOne = () => {
    dispatch(endDuel(currentDuel.playerOne.athleteId))
  }

  const clickWinnerTwo = () => {
    dispatch(endDuel(currentDuel.playerTwo.athleteId))
  }

  const endWinnerDuel = () => {
    dispatch(
      setWinner({
        gameId,
        competitionId,
        categoryId,
        standingId,
        duelId,
        athleteId: currentDuel.result,
      }),
    )
    push('/games/' + gameId)
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
          Сбросить таймер
        </Button>

        {currentDuel?.result ? (
          <Button onClick={() => endWinnerDuel()} style={{ width: '100%' }} type="dashed" danger>
            Закончить поединок
          </Button>
        ) : null}
      </Flex>
      <Divider />
      <Flex gap="middle">
        <div style={{ background: 'red', width: '100%' }}>
          <Player
            isDanger={true}
            addBenefits={clickAddBenefitOne}
            removeBenefits={clickRemoveBenefitOne}
            setCount={clickCountOne}
            setCountFail={clickAddFailOne}
            clickWinner={clickWinnerOne}
          />
        </div>
        <div style={{ background: 'blue', width: '100%' }}>
          <Player
            isDanger={false}
            addBenefits={clickAddBenefitTwo}
            removeBenefits={clickRemoveBenefitTwo}
            setCount={clickCountTwo}
            setCountFail={clickAddFailTwo}
            clickWinner={clickWinnerTwo}
          />
        </div>
      </Flex>
      <Divider />
      <DuelResultContainer />
    </>
  )
}
