import { Button } from 'antd'

const Player = ({ isDanger, setCountFail, setCountFail2, setCount, addBenefits, removeBenefits }) => {
  return (
    <>
      <div>
        <Button danger={isDanger} onClick={addBenefits}>
          Преимущество
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
      </div>
      <div>
        <Button danger={isDanger} onClick={removeBenefits}>
          - Преимущество
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
      </div>
    </>
  )
}

export default Player
