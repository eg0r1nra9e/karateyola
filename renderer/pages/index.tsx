import Head from 'next/head'
import React from 'react'

import { DashBoardContainer } from '../feature/dashboard/containers/DashBoardContainer/DashBoardContainer'

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Управление соревнованиями</title>
      </Head>

      <DashBoardContainer />
    </React.Fragment>
  )
}

export default Home
