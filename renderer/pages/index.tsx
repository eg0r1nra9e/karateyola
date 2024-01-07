import { Button, DatePicker, Form, InputNumber, Layout, Select, Slider, Switch } from 'antd'
import electron from 'electron'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

import { DashBoardContainer } from '../containers/DashBoardContainer/DashBoardContainer'

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
