import { Button, Flex } from 'antd'

const Player = ({ isDanger, setCountFail, setCountFail2, setCount, addBenefits, removeBenefits }) => {
  return (
    <>
      <Flex gap="small" justify="space-between">
        <Button danger={isDanger} onClick={addBenefits} style={{ flexBasis: '100%' }}>
          Преимущество
        </Button>

        <Button type="primary" danger={isDanger} onClick={() => setCountFail(1)} style={{ flexBasis: '100%' }}>
          c1
        </Button>

        <Button type="primary" danger={isDanger} onClick={() => setCountFail2(1)} style={{ flexBasis: '100%' }}>
          c2
        </Button>

        <Button type="dashed" danger={isDanger} onClick={() => setCount(1)} style={{ flexBasis: '100%' }}>
          +1
        </Button>

        <Button type="dashed" danger={isDanger} onClick={() => setCount(2)} style={{ flexBasis: '100%' }}>
          +2
        </Button>

        <Button type="dashed" danger={isDanger} onClick={() => setCount(3)} style={{ flexBasis: '100%' }}>
          +3
        </Button>
      </Flex>
      <Flex gap="middle" style={{ justifyContent: 'space-between' }}>
        <Button danger={isDanger} onClick={removeBenefits}>
          - Преимущество
        </Button>

        <Button type="primary" danger={isDanger} onClick={() => setCountFail(-1)} style={{ flexBasis: '100%' }}>
          - c1
        </Button>

        <Button type="primary" danger={isDanger} onClick={() => setCountFail2(-1)} style={{ flexBasis: '100%' }}>
          - c2
        </Button>

        <Button type="dashed" danger={isDanger} onClick={() => setCount(-1)} style={{ flexBasis: '100%' }}>
          -1
        </Button>

        <Button type="dashed" danger={isDanger} onClick={() => setCount(-2)} style={{ flexBasis: '100%' }}>
          -2
        </Button>

        <Button type="dashed" danger={isDanger} onClick={() => setCount(-3)} style={{ flexBasis: '100%' }}>
          -3
        </Button>
      </Flex>
    </>
  )
}

export default Player
