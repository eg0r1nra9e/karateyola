import { Button } from 'antd'

const Player = ({ isDanger, setCountFail, setCountFail2, setCount, addBenefits, removeBenefits }) => {
  return (
    <>
      <Button danger={isDanger} onClick={addBenefits}>
        Приемущество
      </Button>

      <Button type="primary" danger={isDanger} onClick={() => setCountFail(1)}>
        1-я кат
      </Button>

      <Button type="primary" danger={isDanger} onClick={() => setCountFail2(1)}>
        2-я кат
      </Button>

      <Button type="dashed" danger={isDanger} onClick={() => setCount(1)}>
        +1
      </Button>

      <Button type="dashed" danger={isDanger} onClick={() => setCount(2)}>
        +2
      </Button>

      <Button type="dashed" danger={isDanger} onClick={() => setCount(3)}>
        +3
      </Button>

      <Button danger={isDanger} onClick={removeBenefits}>
        - Приемущество
      </Button>

      <Button type="primary" danger={isDanger} onClick={() => setCountFail(-1)}>
        - 1-я кат
      </Button>

      <Button type="primary" danger={isDanger} onClick={() => setCountFail2(-1)}>
        - 2-я кат
      </Button>

      <Button type="dashed" danger={isDanger} onClick={() => setCount(-1)}>
        -1
      </Button>

      <Button type="dashed" danger={isDanger} onClick={() => setCount(-2)}>
        -2
      </Button>

      <Button type="dashed" danger={isDanger} onClick={() => setCount(-3)}>
        -3
      </Button>
    </>
  )
}

export default Player
