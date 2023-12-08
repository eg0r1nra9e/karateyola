import '../styles/global.css';

import Head from 'next/head';
import React from 'react';

import { MainLayout } from '../layouts/MainLayout/MainLayout';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
