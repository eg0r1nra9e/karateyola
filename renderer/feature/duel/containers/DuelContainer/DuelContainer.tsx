import { Button, Divider, Flex, Typography } from 'antd'
import { useRouter } from 'next/router'
import * as path from 'path'
import { FC, useEffect, useState } from 'react'

import { useAppDispatch } from '../../../../store/hooks'

import { addFailOne, addFailTwo, addScoreOne, addScoreTwo, setTime } from '../../../../store/slices/currentDuelSlice'
import { DuelWithAll } from '../../../../types/DuelWithAll'
import Player from '../../components/Player/Player'
import { DuelResultContainer } from '../DuelResultContainer/DuelResultContainer'

interface IDuelContainer {
  competitionId: string
  categoryId: string
  standingId: string
  duelId: string
}

export const DuelContainer: FC<IDuelContainer> = (props) => {
  const { push } = useRouter()

  const { competitionId, categoryId, standingId, duelId } = props

  const [duel, setDuel] = useState<DuelWithAll>()

  const fetchData = async () => {
    const tasks = [
      async () => {
        if (duelId) {
          const resDuel = await fetch(`/api/duel/${duelId}`)
          const duel: DuelWithAll = await resDuel.json()
          setDuel(duel)
        }
      },
    ]
    await Promise.all(tasks.map((p) => p()))
  }

  // const game = useAppSelector((state) => selectGame(state, gameId))

  // const competitions = useAppSelector(selectCompetitions)
  // const categories = useAppSelector(selectCategories)
  // const athletes = useAppSelector(selectAthletes)
  // const teams = useAppSelector(selectTeams)

  // const competition = competitions?.find((c) => c.id === competitionId)
  // const competitionName = competition?.name

  // const category = categories?.find((c) => c.id === categoryId)
  // const categoryName = category?.name

  // const duel = useAppSelector(selectduel)

  const [timer, setTimer] = useState(duel?.standing?.gameCategory?.category?.time)
  const [timeInterval, setTimeInterval] = useState(null)
  const [isStartTimer, setIsStartTimer] = useState(false)
  const [isAdditionTime, setIsAdditionTime] = useState(false)

  const dispatch = useAppDispatch()

  const beep = (fileType?) => {
    const fileName = fileType ? '/censor-beep-4.mp3' : '/censor-beep-7.mp3'

    const filePath = path.join(fileName)
    const ding = new Audio(filePath)
    ding.play()
  }

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

  const resetTimer = (secund = duel?.standing?.gameCategory?.category?.time) => {
    setTimer(secund)
    setIsStartTimer(false)
    clearInterval(timeInterval)
  }

  // Определение победителя текущей дуэли.
  useEffect(() => {
    if (!duel || !duel.onePlayer || !duel.twoPlayer) {
      return
    }

    // Первый спортсмен набрал 5 нарушений - он проиграл.
    // if (duel?.onePlayer?.fail === 5) {
    //   dispatch(endDuel(duel?.twoPlayer?.athleteId))
    //   beep()
    // }

    // Второй спортсмен набрал 5 нарушений - он проиграл.
    // if (duel?.twoPlayer?.fail > 4) {
    //   dispatch(endDuel(duel?.onePlayer?.athleteId))
    //   beep()
    // }

    // Первый спортсмен набрал 8 очков - он победил.
    // if (duel?.onePlayer?.score >= 8) {
    //   dispatch(endDuel(duel?.onePlayer?.athleteId))
    //   beep()
    // }

    // Второй спортсмен набрал 8 очков - он победил.
    // if (duel?.twoPlayer?.score >= 8) {
    //   dispatch(endDuel(duel?.twoPlayer?.athleteId))
    //   beep()
    // }

    // Время закончилось
    if (!timer) {
      // Разное количество очков, можем определить победителя.
      // if (duel?.onePlayer?.score !== duel?.twoPlayer?.score) {
      //   const winner =
      //     duel?.onePlayer?.score > duel?.twoPlayer?.score
      //       ? duel?.onePlayer?.athleteId
      //       : duel?.twoPlayer?.athleteId
      //   dispatch(endDuel(winner))
      //   beep()
      // } else {
      //   if (duel?.onePlayer?.benefit !== 0) {
      //     dispatch(endDuel(duel?.onePlayer?.athleteId))
      //     beep()
      //   }
      //   if (duel?.twoPlayer?.benefit !== 0) {
      //     dispatch(endDuel(duel?.twoPlayer?.athleteId))
      //     beep()
      //   }
      // }
    }
  }, [timer, duel])

  useEffect(() => {
    if (timer) {
      dispatch(setTime(timer))

      if (timer === 15) {
        beep(true)
      }
    } else {
      beep()

      // Основное время закончилось, очки никто не набрал - продолжить бой в дополнительное время.
      // if (duel?.onePlayer?.score === 0 && duel?.twoPlayer?.score === 0 && !isAdditionTime) {
      //   setIsAdditionTime(true)
      //   resetTimer(category?.additionTime)
      //   return
      // }
    }
  }, [timer])

  // useEffect(() => {
  //   dispatch(
  //     addDuel({
  //       id: duelId,
  //       competitionName,
  //       categoryName,
  //       timer: category.time,
  //       onePlayer: {
  //         id: duel?.athletesId[0],
  //         athleteId: duel?.athletesId[0],
  //         benefit: 0,
  //         fail: 0,
  //         score: 0,
  //       },
  //       twoPlayer: {
  //         id: duel?.athletesId[1] || null,
  //         athleteId: duel?.athletesId[1] || null,
  //         benefit: 0,
  //         fail: 0,
  //         score: 0,
  //       },
  //       result: null,
  //     }),
  //   )
  // }, [duelId, dispatch, duel, categoryName, competitionName])

  const clickAddBenefitOne = () => {
    pauseTimer()
    // if (duel.twoPlayer.benefit === 0 && duel.onePlayer.benefit === 0) {
    //   dispatch(addBenefitOne(1))
    // }
  }
  const clickRemoveBenefitOne = () => {
    pauseTimer()
    // if (duel.onePlayer.benefit > 0) {
    //   dispatch(addBenefitOne(-1))
    // }
  }

  const clickAddBenefitTwo = () => {
    pauseTimer()
    // if (duel.twoPlayer.benefit === 0 && duel.onePlayer.benefit === 0) {
    //   dispatch(addBenefitTwo(1))
    // }
  }

  const clickRemoveBenefitTwo = () => {
    pauseTimer()
    // if (duel.twoPlayer.benefit > 0) {
    //   dispatch(addBenefitTwo(-1))
    // }
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
    //dispatch(endDuel(duel.onePlayer.athleteId))
    beep()
  }

  const clickWinnerTwo = () => {
    //dispatch(endDuel(duel.twoPlayer.athleteId))
    beep()
  }

  const endWinnerDuel = () => {
    // dispatch(
    //   setWinner({
    //     gameId,
    //     competitionId,
    //     categoryId,
    //     standingId,
    //     duelId,
    //     athleteId: duel.result,
    //   }),
    // )
    // push('/games/' + gameId)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h1>{duel?.standing?.gameCategory?.gameCompetition?.game?.name}</h1>
      <h2>
        {duel?.standing?.gameCategory?.gameCompetition?.competition?.name},{' '}
        {duel?.standing?.gameCategory?.category?.name}
      </h2>
      <h3>
        {' '}
        Спортсмены: {duel?.onePlayer?.firstName} {duel?.onePlayer?.lastName} {duel?.onePlayer?.team?.name}{' '}
        {duel?.onePlayer?.team?.city?.city},{duel?.twoPlayer?.firstName} {duel?.twoPlayer?.lastName}{' '}
        {duel?.twoPlayer?.team?.name} {duel?.twoPlayer?.team?.city?.city},
      </h3>
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

        {/* {duel?.result ? (
          <Button onClick={() => endWinnerDuel()} style={{ width: '100%' }} type="dashed" danger>
            Закончить поединок
          </Button>
        ) : null} */}
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
      <Typography.Paragraph style={{ fontSize: '0.3em' }}>
        <DuelResultContainer />
      </Typography.Paragraph>
    </>
  )
}
