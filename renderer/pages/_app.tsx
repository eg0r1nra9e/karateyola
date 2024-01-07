import '../styles/global.css'
import 'dayjs/locale/ru'

import { ConfigProvider } from 'antd'
import ru from 'antd/locale/ru_RU'
import dayjs from 'dayjs'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'

import { MainLayout } from '../layouts/MainLayout/MainLayout'
import { createStore } from '../store/store'
import { readData, saveData } from '../utils/file'

import type { AppProps } from 'next/app'
import { initMessageListener } from 'redux-state-sync'

dayjs.locale('ru')

function MyApp({ Component, pageProps }: AppProps) {
  const reduxState = readData()
  const store = createStore(reduxState)

  initMessageListener(store)
  store.subscribe(() => {
    const data = store.getState()
    saveData(data)
  })

  return (
    <Provider store={store}>
      <ConfigProvider locale={ru}>
        <MainLayout>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <Component {...pageProps} />
        </MainLayout>
      </ConfigProvider>
    </Provider>
  )
}

export default MyApp
