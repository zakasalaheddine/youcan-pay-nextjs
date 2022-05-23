/* eslint-disable react-hooks/exhaustive-deps */
declare var YCPay: any
import { useEffect, useRef } from 'react'

export const useYouCanPay = (options: {
  publicKey: string
  formContainer: string
  locale: string
  isSandbox: boolean
  errorContainer: string
}) => {
  const youCanPay = useRef<typeof YCPay | null>(null)
  useEffect(() => {
    const { publicKey, formContainer, locale, isSandbox, errorContainer } =
      options
    youCanPay.current = new YCPay(publicKey, {
      formContainer: formContainer,
      locale: locale,
      isSandbox: isSandbox,
      errorContainer: errorContainer
    })
  }, [])

  const renderCreditCardForm = () => {
    // throw new Error('You Can Pay instance is not found')
    if (youCanPay.current) {
      youCanPay.current.renderCreditCardForm()
    }
  }
  const renderCashPlusForm = () => {
    // throw new Error('You Can Pay instance is not found')
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

  return { renderCreditCardForm, renderCashPlusForm, pay }
}
