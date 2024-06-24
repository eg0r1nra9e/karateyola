import Head from 'next/head'
import React from 'react'

import { EventsContainer } from '../feature/events/containers/EventsContainer/EventsContainer'

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Управление соревнованиями</title>
      </Head>

      <h1>События</h1>

      <EventsContainer />
    </React.Fragment>
  )
}

export default Home
