/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import 'styles/global.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://youcanpay.com/js/ycpay.js"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
