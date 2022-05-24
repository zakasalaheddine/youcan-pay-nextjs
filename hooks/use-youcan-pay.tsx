/* eslint-disable react-hooks/exhaustive-deps */
declare var YCPay: any
import { useEffect, useRef, useState } from 'react'
import {
  YOUCAN_API_TEST_MODE,
  YOUCAN_PUBLIC_KEY,
  YOUCAN_SANDBOX_PUBLIC_KEY
} from 'utils/constants'
import { getToken } from 'utils/get-token'
import { postToYouCanPay } from 'utils/post-youcan-pay'

interface IManualPayment {
  expire_date: string
  credit_card: string
  cvv: string
  card_holder_name: string
}

export const useYouCanPay = (
  options: {
    publicKey: string
    formContainer: string
    locale: string
    isSandbox: boolean
    errorContainer: string
  },
  initiatYCPay = true
) => {
  const youCanPay = useRef<typeof YCPay | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState(false)

  const getYouCanPayToken = async () => {
    try {
      const result = await getToken()
      setToken(result.token)
    } catch (error) {
      console.log('error')
    }
  }
  useEffect(() => {
    const { publicKey, formContainer, locale, isSandbox, errorContainer } =
      options
    if (initiatYCPay && window.YCPay !== undefined) {
      youCanPay.current = new window.YCPay(publicKey, {
        formContainer: formContainer,
        locale: locale,
        isSandbox: isSandbox,
        errorContainer: errorContainer
      })
    }

    getYouCanPayToken()
  }, [])

  const renderCreditCardForm = () => {
    if (youCanPay.current) {
      youCanPay.current.renderCreditCardForm()
    }
  }
  const renderCashPlusForm = () => {
    if (youCanPay.current) {
      youCanPay.current.renderCashPlusForm()
    }
  }

  const pay = (
    token: string,
    successCallBack: (result: any) => void,
    errorCallBack: (errorMessage: string) => void
  ) => {
    if (!youCanPay) throw new Error('You Can Pay instance is not found')
    youCanPay.current.pay(token).then(successCallBack).catch(errorCallBack)
  }

  const manualPayment = async (
    params: IManualPayment,
    successCallBack: (result: any) => void,
    errorCallBack: (errorMessage: string) => void
  ) => {
    try {
      const response = await postToYouCanPay('/pay', {
        ...params,
        token_id: token,
        pub_key: YOUCAN_API_TEST_MODE
          ? YOUCAN_SANDBOX_PUBLIC_KEY
          : YOUCAN_PUBLIC_KEY
      })
      successCallBack(response)
    } catch (error) {
      errorCallBack(error as string)
    }
  }

  return {
    manualPayment,
    renderCreditCardForm,
    renderCashPlusForm,
    pay,
    token,
    isLoading
  }
}
