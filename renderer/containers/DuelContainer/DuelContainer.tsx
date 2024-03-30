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
import { selectCategories } from '../../store/slices/categoriesSlice'

interface IDuelContainer {
  gameId: string
  competitionId: string
  categoryId: string
  standingId: string
  duelId: string
}

export const DuelContainer: FC<IDuelContainer> = (props) => {
  const { push } = useRouter()

  const { gameId, competitionId, categoryId, standingId, duelId } = props

  const game = useAppSelector((state) => selectGame(state, gameId))

  const competitions = useAppSelector(selectCompetitions)
  const categories = useAppSelector(selectCategories)
  const athletes = useAppSelector(selectAthletes)
  const teams = useAppSelector(selectTeams)

  const competition = competitions?.find((c) => c.id === competitionId)
  const competitionName = competition?.name

  const category = categories?.find((c) => c.id === categoryId)
  const categoryName = category?.name

  const gameCompetitions = game?.competitions.find((c) => c.id === competitionId);
  const gameCategories = gameCompetitions?.categories.find((c) => c.id === categoryId)
  const standing = gameCategories?.standings.find((c) => c.id === standingId)

  const duel = standing?.duels.find((c) => c.id === duelId)

  const currentDuel = useAppSelector(selectCurrentDuel)

  const [timer, setTimer] = useState(category?.time)
  const [timeInterval, setTimeInterval] = useState(null)
  const [isStartTimer, setIsStartTimer] = useState(false)
  const [isAdditionTime, setIsAdditionTime] = useState(false)

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

  // Определение победителя текущей дуэли.
  const getWinner = () => {
    if (!currentDuel || !currentDuel.playerOne || !currentDuel.playerTwo) {
      return
    }

    // Первый спортсмен набрал 5 нарушений - он проиграл.
    if (currentDuel.playerOne.fail === 5) {
      dispatch(endDuel(currentDuel.playerTwo.athleteId))
    }

    // Второй спортсмен набрал 5 нарушений - он проиграл.
    if (currentDuel.playerTwo.fail === 5) {
      dispatch(endDuel(currentDuel.playerOne.athleteId))
    }

    // Первый спортсмен набрал 8 очков - он победил.
    if (currentDuel.playerOne.score === 8) {
      dispatch(endDuel(currentDuel.playerOne.athleteId))
    }
    
    // Второй спортсмен набрал 8 очков - он победил.
    if (currentDuel.playerTwo.score === 8) {
      dispatch(endDuel(currentDuel.playerTwo.athleteId))
    }

    // Время закончилось
    if (!timer) {
      
      // Разное количество очков, можем определить победителя.
      if (currentDuel.playerOne.score !== currentDuel.playerTwo.score) {
        const winner =
          currentDuel.playerOne.score > currentDuel.playerTwo.score
            ? currentDuel.playerOne.athleteId
            : currentDuel.playerTwo.athleteId

        dispatch(endDuel(winner))
      } else {
        if (currentDuel.playerOne.benefit !== 0) {
          dispatch(endDuel(currentDuel.playerOne.athleteId))
        }
        if (currentDuel.playerTwo.benefit !== 0) {
          dispatch(endDuel(currentDuel.playerTwo.athleteId))
        }
      }


    }
  }

  useEffect(() => {
    if (timer) {
      dispatch(setTime(timer))

      if (timer === 15) { 
        const ding = new Audio('censor-beep-4.mp3');
        ding.play();
      }
    } else {
      const ding = new Audio('censor-beep-7.mp3');
      ding.play();

      // Основное время закончилось, очки никто не набрал - продолжить бой в дополнительное время.
      if (currentDuel.playerOne.score === 0 &&
        currentDuel.playerTwo.score === 0 &&
        !isAdditionTime) {
        resetTimer(category.additionTime)
        setIsAdditionTime(true)
        return
      }

      getWinner()
    }
    
  }, [timer])

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
          score: 0,
        },
        playerTwo: {
          id: duel?.athletesId[1] || null,
          athleteId: duel?.athletesId[1] || null,
          benefit: 0,
          fail: 0,
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
    if (currentDuel.playerTwo.benefit === 0) {
      dispatch(addBenefitOne(1))
    }
  }
  const clickRemoveBenefitOne = () => {
    pauseTimer()
    dispatch(addBenefitOne(-1))
  }

  const clickAddBenefitTwo = () => {
    pauseTimer()
    if (currentDuel.playerOne.benefit === 0) {
      dispatch(addBenefitTwo(1))
    }
  }

  const clickRemoveBenefitTwo = () => {
    pauseTimer()
    dispatch(addBenefitTwo(-1))
  }

  const clickCountOne = (count: number) => {
    pauseTimer()
    dispatch(addScoreOne(count))
    getWinner()
  }

  const clickCountTwo = (count: number) => {
    pauseTimer()
    dispatch(addScoreTwo(count))
    getWinner()
  }

  const clickAddFailOne = (value) => {
    pauseTimer()
    dispatch(addFailOne(value))
    getWinner()
  }

  const clickAddFailTwo = (value) => {
    pauseTimer()
    dispatch(addFailTwo(value))
    getWinner()
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
