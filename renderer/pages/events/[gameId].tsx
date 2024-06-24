import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { EventContainer } from '../../feature/events/containers/EventContainer/EventContainer'

// TODO: Это "Событие"
const Event: NextPage = () => {
  const router = useRouter()
  const { query } = router

  return <EventContainer gameId={+query?.gameId} />
}

export default Event
