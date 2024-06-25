import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { DuelContainer } from '../../../feature/duel/containers/DuelContainer/DuelContainer'

const Duel: NextPage = () => {
  const router = useRouter()
  const { query } = router

  return <DuelContainer duelId={+query?.duelId} />
}

export default Duel
