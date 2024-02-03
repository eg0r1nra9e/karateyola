import { Button, Flex } from 'antd'

const Player = ({ isDanger, setCountFail, setCountFail2, setCount, addBenefits, removeBenefits, clickWinner }) => {
  return (
    <>
      <Flex gap="small" justify="space-between">
        <Button danger={isDanger} onClick={addBenefits} style={{ width: '16%' }}>
          Преимущество
        </Button>

        <Button type="primary" danger={isDanger} onClick={() => setCountFail(1)} style={{ width: '16%' }}>
          c1
        </Button>

        <Button type="primary" danger={isDanger} onClick={() => setCountFail2(1)} style={{ width: '16%' }}>
          c2
        </Button>

        <Button type="dashed" danger={isDanger} onClick={() => setCount(1)} style={{ width: '16%' }}>
          +1
        </Button>

        <Button type="dashed" danger={isDanger} onClick={() => setCount(2)} style={{ width: '16%' }}>
          +2
        </Button>

        <Button type="dashed" danger={isDanger} onClick={() => setCount(3)} style={{ width: '16%' }}>
          +3
        </Button>
      </Flex>
      <Flex gap="small" style={{ justifyContent: 'space-between' }}>
        <Button danger={isDanger} onClick={removeBenefits} style={{ width: '16%' }}>
          - Преимущество
        </Button>

        <Button type="primary" danger={isDanger} onClick={() => setCountFail(-1)} style={{ width: '16%' }}>
          - c1
        </Button>

        <Button type="primary" danger={isDanger} onClick={() => setCountFail2(-1)} style={{ width: '16%' }}>
          - c2
        </Button>

        <Button type="dashed" danger={isDanger} onClick={() => setCount(-1)} style={{ width: '16%' }}>
          -1
        </Button>

        <Button type="dashed" danger={isDanger} onClick={() => setCount(-2)} style={{ width: '16%' }}>
          -2
        </Button>

        <Button type="dashed" danger={isDanger} onClick={() => setCount(-3)} style={{ width: '16%' }}>
          -3
        </Button>
      </Flex>
      <Flex>
        <Button danger={isDanger} onClick={() => clickWinner()} style={{ width: '100%' }}>
          Победа
        </Button>
      </Flex>
    </>
  )
}

export default Player
