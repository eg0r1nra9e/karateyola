import { Flex, Typography } from 'antd'
import { FC } from 'react'

interface IViolationsProps {
  type: string
  value: number
  isDanger?: boolean
}

const MAX_VALUE = 4

export const Violations: FC<IViolationsProps> = (props) => {
  const { value, isDanger, type } = props

  const background = isDanger ? 'red' : 'blue'

  const violations = ['', '', '', '', '']

  return (
    <Flex gap="large" justify="space-between" style={{ marginTop: 0, width: '100%' }}>
      <Typography.Title
        level={1}
        style={{
          marginTop: 0,
          width: '20%',
          color: background,
        }}
      >
        {type}:
      </Typography.Title>
      {violations.map((v, index) => {
        return (
          <Typography.Title
            level={1}
            key={index}
            style={{
              marginTop: 0,
              width: '20%',
              background: index < value ? background : 'white',
              color: index < value ? 'white' : 'gray',
            }}
          >
            {v}
          </Typography.Title>
        )
      })}
    </Flex>
  )
}
