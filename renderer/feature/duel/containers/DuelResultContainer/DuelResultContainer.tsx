import { Flex, Typography } from 'antd'
import { useEffect, useState } from 'react'

import { useAppSelector } from '../../../../store/hooks'
import { selectCurrentDuel } from '../../../../store/slices/currentDuelSlice'
import { Violations } from '../../components/Violations/Violations'

export const DuelResultContainer = () => {
  const [isBrowser, setIsBrowser] = useState(false)

  const currentDuel = useAppSelector(selectCurrentDuel)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const minutesString = String(Math.floor(currentDuel?.timer / 60)).padStart(2, '0')
  const secondsString = String(currentDuel?.timer % 60).padStart(2, '0')

  if (currentDuel?.winnerId) {
    const winner =
      currentDuel?.winnerId === currentDuel?.firstPlayer?.id ? currentDuel?.firstPlayer : currentDuel?.secondPlayer
    return (
      <Flex vertical>
        <Typography.Title level={1} style={{ marginTop: 0, width: '100%', fontSize: '10em' }}>
          Победитель: {winner.firstName} {winner.lastName} {winner.team?.name} {winner.team?.city?.city}
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
        <Typography.Title level={1} style={{ marginTop: 0, width: '50%', fontSize: '3em' }} type="danger">
          {currentDuel?.firstPlayer?.firstName} {currentDuel?.firstPlayer?.lastName}{' '}
          {currentDuel?.firstPlayer?.team?.name} {currentDuel?.firstPlayer?.team?.city?.city}
        </Typography.Title>
        <Typography.Title
          level={1}
          style={{ margin: 1, width: '50%', color: 'blue', textAlign: 'right', fontSize: '3em' }}
        >
          {currentDuel?.secondPlayer?.firstName} {currentDuel?.secondPlayer?.lastName}{' '}
          {currentDuel?.secondPlayer?.team?.name} {currentDuel?.secondPlayer?.team?.city?.city}
        </Typography.Title>
      </Flex>
      <Flex style={{ justifyContent: 'space-between' }}>
        <Typography.Title
          level={1}
          style={{ margin: 0, width: '25%', fontSize: '35em', whiteSpace: 'nowrap' }}
          type="danger"
        >
          {currentDuel?.firstPlayer?.score}
          {currentDuel?.firstPlayer?.benefit ? '`' : null}
        </Typography.Title>
        <Typography.Title level={1} style={{ margin: 0, width: '50%', textAlign: 'center', fontSize: '15em' }}>
          {minutesString} : {secondsString}
        </Typography.Title>
        <Typography.Title
          level={1}
          style={{ margin: 0, width: '25%', color: 'blue', textAlign: 'right', fontSize: '35em', whiteSpace: 'nowrap' }}
        >
          {currentDuel?.secondPlayer?.benefit ? '`' : null}
          {currentDuel?.secondPlayer?.score}
        </Typography.Title>
      </Flex>

      <Flex style={{ justifyContent: 'space-between' }}>
        <div style={{ margin: 0, width: '40%' }}>
          <Flex>
            <Violations type="Чуй" value={currentDuel?.firstPlayer?.fail} isDanger />
          </Flex>
        </div>
        <div style={{ margin: 0, width: '40%' }}></div>
        <div style={{ margin: 0, width: '40%' }}>
          <Violations type="Чуй" value={currentDuel?.secondPlayer?.fail} />
        </div>
      </Flex>
      <Flex style={{ justifyContent: 'space-between' }}>&nbsp;</Flex>
    </Flex>
  )
}
