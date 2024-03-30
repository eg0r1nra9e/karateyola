import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { DuelContainer } from '../../../../../../containers/DuelContainer/DuelContainer'

const Duel: NextPage = () => {
  const router = useRouter()
  const { query } = router

  return (
    <DuelContainer
      gameId={query?.gameId?.toString()}
      competitionId={query?.competitionId?.toString()}
      categoryId={query?.categoryId?.toString()}
      standingId={query?.standingId?.toString()}
      duelId={query?.duelId?.toString()}
    />
  )
}

export default Duel
