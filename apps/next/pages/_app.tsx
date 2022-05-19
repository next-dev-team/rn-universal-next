import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import type { SolitoAppProps } from 'solito'
import 'raf/polyfill'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Solito Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <style type="text/css">{`
        @font-face {
          font-family: 'MaterialIcons';
          src: url('/fonts/MaterialIcons.ttf') format('truetype');
        }
        @font-face {
          font-family: 'AntDesign';
          src: url('/fonts/AntDesign.ttf') format('truetype');
        }
      `}</style>
      </>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
