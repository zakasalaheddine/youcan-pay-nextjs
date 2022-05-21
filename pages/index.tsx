/* eslint-disable react-hooks/exhaustive-deps */
import { useYouCanPay } from 'hooks/use-youcan-pay'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { YOUCAN_API_TEST_MODE, YOUCAN_PUBLIC_KEY, YOUCAN_SANDBOX_PUBLIC_KEY } from 'utils/constants'
import { getToken } from 'utils/get-token'

const Home: NextPage = () => {
  const { renderCreditCardForm, pay } = useYouCanPay({
    publicKey: YOUCAN_API_TEST_MODE
      ? YOUCAN_SANDBOX_PUBLIC_KEY
      : YOUCAN_PUBLIC_KEY,
    formContainer: '#payment-container',
    locale: 'en',
    isSandbox: YOUCAN_API_TEST_MODE,
    errorContainer: '#error-container'
  })
  const [isloaded, setLoaded] = useState(false)
  const [token, setToken] = useState('')
  const getYouCanPayToken = async () => {
    const result = await getToken()
    setToken(result.token)
  }
  useEffect(() => {  
    if (!isloaded) {
      renderCreditCardForm()
      setLoaded(true)
      getYouCanPayToken()
    }
  }, [isloaded])

  const handlePayment = async () => {
    pay(
      token,
      (success) => {
        console.log('Payment Done', success)
      },
      (error) => {
        console.log('Payment Not worked', error)
      }
    )
  }
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center my-5">
        Payment With YouCan Payment
      </h1>
      <div id="error-container" className="my-5"></div>
      <div id="payment-container"></div>
      <div className="w-full flex items-center justify-center">
        <button
          onClick={handlePayment}
          className="bg-slate-400 py-2 px-6 text-white font-medium uppercase rounded max-w-xl w-full my-5"
        >
          Pay
        </button>
      </div>
    </div>
  )
}

export default Home
