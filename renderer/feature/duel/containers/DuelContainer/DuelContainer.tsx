import { App, Button, Divider, Flex, Typography } from 'antd'
import { useRouter } from 'next/router'
import * as path from 'path'
import { FC, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../store/hooks'

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
} from '../../../../store/slices/currentDuelSlice'
import { DuelWithAll } from '../../../../types/DuelWithAll'
import Player from '../../components/Player/Player'
import { DuelResultContainer } from '../DuelResultContainer/DuelResultContainer'

interface IDuelContainer {
  duelId: number
}

export const DuelContainer: FC<IDuelContainer> = (props) => {
  const { push } = useRouter()

  const { duelId } = props

  const { notification } = App.useApp()

  const [duelData, setDuelData] = useState<DuelWithAll>()
  const [timer, setTimer] = useState(duelData?.standing?.gameCategory?.category?.time)
  const [timeInterval, setTimeInterval] = useState(null)
  const [isStartTimer, setIsStartTimer] = useState(false)

  const fetchData = async () => {
    const tasks = [
      async () => {
        if (duelId) {
          const resDuel = await fetch(`/api/duel/${duelId}`)
          const duel: DuelWithAll = await resDuel.json()
          setDuelData(duel)
        }
      },
    ]
    await Promise.all(tasks.map((p) => p()))
  }

  const duel = useAppSelector(selectCurrentDuel)

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

  const resetTimer = (secund = duelData?.standing?.gameCategory?.category?.time) => {
    setTimer(secund)
    setIsStartTimer(false)
    clearInterval(timeInterval)
  }

  useEffect(() => {
    if (!duelData) {
      return
    }

    setTimer(duelData?.standing?.gameCategory?.category?.time)
  }, [duelData])

  useEffect(() => {
    if (!duelData || !duelData.firstPlayer || !duelData.secondPlayer || timer === undefined || timer === null) {
      return
    }

    if (timer) {
      dispatch(setTime(timer))

      if (timer === 15) {
        beep(true)
      }
    } else {
      beep()
      dispatch(setTime(timer))
    }
  }, [timer])

  useEffect(() => {
    if (!duelData) {
      return
    }

    dispatch(
      addDuel({
        id: duelId,
        competitionName: duelData.standing.gameCategory.gameCompetition.competition.name,
        categoryName: duelData.standing.gameCategory.category.name,
        timer: duelData?.standing?.gameCategory?.category?.time,
        firstPlayer: { ...duelData.firstPlayer, benefit: 0, fail: 0, score: 0 },
        secondPlayer: { ...duelData.secondPlayer, benefit: 0, fail: 0, score: 0 },
        winnerId: null,
      }),
    )
  }, [duelId, duelData, dispatch])

  const clickAddBenefitOne = () => {
    if (duel.secondPlayer.benefit === 0 && duel.firstPlayer.benefit === 0) {
      dispatch(addBenefitOne(1))
      pauseTimer()
    }
  }
  const clickRemoveBenefitOne = () => {
    if (duel.firstPlayer.benefit > 0) {
      dispatch(addBenefitOne(-1))
      pauseTimer()
    }
  }

  const clickAddBenefitTwo = () => {
    if (duel.secondPlayer.benefit === 0 && duel.firstPlayer.benefit === 0) {
      dispatch(addBenefitTwo(1))
      pauseTimer()
    }
  }

  const clickRemoveBenefitTwo = () => {
    if (duel.secondPlayer.benefit > 0) {
      dispatch(addBenefitTwo(-1))
      pauseTimer()
    }
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
    dispatch(endDuel(duel.firstPlayer.id))
    beep()
  }

  const clickWinnerTwo = () => {
    dispatch(endDuel(duel.secondPlayer.id))
    beep()
  }

  const endWinnerDuel = async () => {
    try {
      await fetch(`/api/duel/${duelId}`, {
        body: JSON.stringify({
          ...duelData,
          winnerId: duel.winnerId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      })
      notification.success({
        message: `Сохранение`,
        description: 'Результат сохранен',
      })
    } catch (error) {
      notification.error({
        message: `Сохранение`,
        description: 'При сохранении произошла ошибка.',
      })
    }

    push('/events/' + duelData.standing.gameCategory.gameCompetition.gameId)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h1>{duelData?.standing?.gameCategory?.gameCompetition?.game?.name}</h1>
      <h2>
        {duelData?.standing?.gameCategory?.gameCompetition?.competition?.name},{' '}
        {duelData?.standing?.gameCategory?.category?.name}
      </h2>
      <h3>
        {' '}
        Спортсмены: {duelData?.firstPlayer?.firstName} {duelData?.firstPlayer?.lastName}{' '}
        {duelData?.firstPlayer?.team?.name} {duelData?.firstPlayer?.team?.city?.city},
        {duelData?.secondPlayer?.firstName} {duelData?.secondPlayer?.lastName} {duelData?.secondPlayer?.team?.name}{' '}
        {duelData?.secondPlayer?.team?.city?.city},
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
        <Button onClick={() => endWinnerDuel()} style={{ width: '100%' }}>
          Закончить поединок
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
        <DuelResultContainer type="first-second" />
      </Typography.Paragraph>
    </>
  )
}
