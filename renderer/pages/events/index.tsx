import Head from 'next/head'
import { EventsContainer } from '../../feature/events/containers/EventsContainer/EventsContainer'

const Home = () => {
  return (
    <>
      <Head>
        <title>Управление соревнованиями</title>
      </Head>

      <h1>События</h1>

      <EventsContainer />
    </>
  )
}

export default Home
