import { Flex, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'

import { useAppSelector } from '../../../../store/hooks'
import { selectCurrentDuel } from '../../../../store/slices/currentDuelSlice'
import { Violations } from '../../components/Violations/Violations'

interface IDuelResultContainer {
  type: 'first-second' | 'second-first'
}

export const DuelResultContainer: FC<IDuelResultContainer> = (props) => {
  const [isBrowser, setIsBrowser] = useState(false)

  const currentDuel = useAppSelector(selectCurrentDuel)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const minutesString = String(Math.floor(currentDuel?.timer / 60)).padStart(2, '0')
  const secondsString = String(currentDuel?.timer % 60).padStart(2, '0')

  const leftPlayer = props.type === 'first-second' ? currentDuel?.firstPlayer : currentDuel?.secondPlayer
  const rightPlayer = props.type === 'first-second' ? currentDuel?.secondPlayer : currentDuel?.firstPlayer

  if (currentDuel?.winnerId) {
    const winner =
      currentDuel?.winnerId === currentDuel?.firstPlayer?.id ? currentDuel?.firstPlayer : currentDuel?.secondPlayer
    return (
      <Flex vertical>
        <Typography.Title level={1} style={{ marginTop: 0, width: '100%', fontSize: '10em' }}>
          Победитель: {winner?.firstName} {winner?.lastName} {winner?.team?.name} {winner?.team?.city?.city}
        </Typography.Title>
      </Flex>
    )
  }

  if (!isBrowser) {
    return null
  }

  return (
    <Flex vertical>
      <Flex style={{ justifyContent: 'center' }}>
        <Typography.Title level={2} style={{ margin: 0, marginRight: '25px' }}>
          {currentDuel?.competitionName}
        </Typography.Title>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {currentDuel?.categoryName}
        </Typography.Title>
      </Flex>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Typography.Title
          level={1}
          style={{ marginTop: 0, width: '50%', color: props.type === 'first-second' ? 'red' : 'blue', fontSize: '3em' }}
        >
          {leftPlayer?.firstName} {leftPlayer?.lastName} {leftPlayer?.team?.name} {leftPlayer?.team?.city?.city}
        </Typography.Title>
        <Typography.Title
          level={1}
          style={{
            marginTop: 0,
            width: '50%',
            color: props.type === 'first-second' ? 'blue' : 'red',
            textAlign: 'right',
            fontSize: '3em',
          }}
        >
          {rightPlayer?.firstName} {rightPlayer?.lastName} {rightPlayer?.team?.name} {rightPlayer?.team?.city?.city}
        </Typography.Title>
      </Flex>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Typography.Title
          level={1}
          style={{
            margin: 0,
            width: '25%',
            fontSize: '35em',
            whiteSpace: 'nowrap',
            color: props.type === 'first-second' ? 'red' : 'blue',
          }}
        >
          {leftPlayer?.score}
          {leftPlayer?.benefit ? '`' : null}
        </Typography.Title>
        <Typography.Title
          level={1}
          style={{ margin: 0, width: '50%', textAlign: 'center', fontSize: '15em', whiteSpace: 'nowrap' }}
        >
          {minutesString} : {secondsString}
        </Typography.Title>
        <Typography.Title
          level={1}
          style={{
            margin: 0,
            width: '25%',
            textAlign: 'right',
            fontSize: '35em',
            whiteSpace: 'nowrap',
            color: props.type === 'first-second' ? 'blue' : 'red',
          }}
        >
          {rightPlayer?.benefit ? '`' : null}
          {rightPlayer?.score}
        </Typography.Title>
      </Flex>

      <Flex style={{ justifyContent: 'space-between' }}>
        <div style={{ margin: 0, width: '40%' }}>
          <Flex>
            <Violations type="Чуй" value={leftPlayer?.fail} isDanger={props.type === 'first-second'} />
          </Flex>
        </div>
        <div style={{ margin: 0, width: '40%' }}></div>
        <div style={{ margin: 0, width: '40%' }}>
          <Violations type="Чуй" value={rightPlayer?.fail} isDanger={props.type === 'second-first'} />
        </div>
      </Flex>
      <Flex style={{ justifyContent: 'space-between' }}>&nbsp;</Flex>
    </Flex>
  )
}
