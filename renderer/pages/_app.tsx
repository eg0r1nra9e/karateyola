import '../styles/global.css'
import 'dayjs/locale/ru'

import { ConfigProvider, theme } from 'antd'
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
import { Store } from '@reduxjs/toolkit'

dayjs.locale('ru')

// global store, used only at client
let globalClientStore: Store | undefined

function MyApp({ Component, pageProps, router }: AppProps) {
  const reduxState = readData()
  const store = globalClientStore || (globalClientStore = createStore(reduxState))

  initMessageListener(store)
  store.subscribe(() => {
    const data = store.getState()
    saveData(data)
  })

  const getContent = () => {
    if (router.pathname.startsWith('/current-result')) {
      return <Component {...pageProps} />
    }

    return (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    )
  }


  return (
    <Provider store={store}>
      <ConfigProvider locale={ru} theme={{algorithm: theme.darkAlgorithm}}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {getContent()}
      </ConfigProvider>
    </Provider>
  )
}

export default MyApp
