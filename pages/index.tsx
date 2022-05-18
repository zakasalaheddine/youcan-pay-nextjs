import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'

const Home: NextPage = () => {
  const paymentRef = useRef(null)
  const [isloaded, setLoaded] = useState(false)
  useEffect(() => {
    if (!isloaded) {
      const ycPay = new YCPay('pub_sandbox_7799f15c-4e43-47d8-a8ad-0900f', {
        formContainer: '#payment-container',
        locale: 'en',
        isSandbox: true,
        errorContainer: '#error-container'
      })
      ycPay.renderCreditCardForm()
      setLoaded(true)
    }
  }, [isloaded])
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Payment With YouCan Payment
      </h1>
      <div id="error-container"></div>
      <div id="payment-container" ref={paymentRef}></div>
      <button
        id="pay"
        className="bg-slate-400 py-2 px-6 text-white font-medium uppercase rounded"
      >
        Pay
      </button>
    </>
  )
}

export default Home
