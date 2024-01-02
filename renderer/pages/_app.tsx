import '../styles/global.css'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import Head from 'next/head'
import React from 'react'
import ru from 'antd/locale/ru_RU'

import { MainLayout } from '../layouts/MainLayout/MainLayout'

import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'

dayjs.locale('ru')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={ru}>
      <MainLayout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </MainLayout>
    </ConfigProvider>
  )
}

export default MyApp
