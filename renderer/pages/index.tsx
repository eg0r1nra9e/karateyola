import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import electron from 'electron'
import { Layout, Form, Select, InputNumber, DatePicker, Switch, Slider, Button } from 'antd'
import { DashBoardContainer } from '../containers/DashBoardContainer/DashBoardContainer'

const ipcRenderer = electron.ipcRenderer

const { Header, Content } = Layout
const { Item: FormItem } = Form
const { Option } = Select

const Home = () => {
  const openWindow = () => {
    ipcRenderer.send('show-sample')
  }

  return (
    <React.Fragment>
      <Head>
        <title>Управление соревнованиями</title>
      </Head>

      <DashBoardContainer />

      <Header>
        <Link href="sample">
          <a>Go to next page</a>
        </Link>
        <Link href="/sample">
          <a> (Go to sample page)</a>
        </Link>

        <a
          onClick={(e) => {
            window.open('/next', '_blank', 'contextIsolation=no,nodeIntegration=yes')
          }}
        >
          {' '}
          item
        </a>
      </Header>
    </React.Fragment>
  )
}

export default Home
