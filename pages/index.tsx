import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { getToken } from 'utils/get-token'

const Home: NextPage = () => {
  const paymentRef = useRef(null)
  const youCanPayRef = useRef(null)
  const [isloaded, setLoaded] = useState(false)
  const [token, setToken] = useState('')
  const getYouCanPayToken = async () => {
    const result = await getToken()
    setToken(result.token)
  }
  useEffect(() => {
    if (!isloaded) {
      youCanPayRef.current = new YCPay(
        'pub_sandbox_7799f15c-4e43-47d8-a8ad-0900f',
        {
          formContainer: '#payment-container',
          locale: 'en',
          isSandbox: true,
          errorContainer: '#error-container'
        }
      )
      youCanPayRef.current.renderCreditCardForm()
      setLoaded(true)
      getYouCanPayToken()
    }
  }, [isloaded])

  const handlePayment = async () => {
    youCanPayRef.current
      .pay(token)
      .then(() => console.log('Payment Done'))
      .catch((error) => console.log('Payment Not worked', error))
  }
  return (
    <div ref={youCanPayRef}>
      <h1 className="text-3xl font-bold underline">
        Payment With YouCan Payment
      </h1>
      <div id="error-container"></div>
      <div id="payment-container" ref={paymentRef}></div>
      <button
        onClick={handlePayment}
        className="bg-slate-400 py-2 px-6 text-white font-medium uppercase rounded"
      >
        Pay
      </button>
    </div>
  )
}

export default Home
