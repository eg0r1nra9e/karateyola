import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { DuelContainer } from '../../../../../containers/DuelContainer/DuelContainer'

const Duel: NextPage = () => {
  const router = useRouter()
  const { query } = router

  return (
    <DuelContainer
      gameId={query?.gameId?.toString()}
      competitionId={query?.competitionId?.toString()}
      categoryName={query?.categoryName?.toString()}
      duelId={query?.duelId?.toString()}
    />
  )
}

export default Duel
