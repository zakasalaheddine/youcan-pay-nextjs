import type { NextPage } from 'next'
import { padStart, range } from 'lodash'
import { useState } from 'react'
import CreditCard from 'components/credit-card'
import { isValidCardNumber } from 'utils/is-valide-card-number'
import { useYouCanPay } from 'hooks/use-youcan-pay'
import {
  YOUCAN_API_TEST_MODE,
  YOUCAN_PUBLIC_KEY,
  YOUCAN_SANDBOX_PUBLIC_KEY,
} from 'utils/constants'

interface IErrors {
  cardNumber: string | undefined
  cardHolder: string | undefined
  cardExpMonth: string | undefined
  cardExpYear: string | undefined
  cardCVV: string | undefined
  hasErrors: boolean | undefined
}

const CustomCreditCard: NextPage = () => {
  const { manualPayment } = useYouCanPay(
    {
      publicKey: YOUCAN_API_TEST_MODE
        ? YOUCAN_SANDBOX_PUBLIC_KEY
        : YOUCAN_PUBLIC_KEY,
      formContainer: '',
      locale: 'en',
      isSandbox: YOUCAN_API_TEST_MODE,
      errorContainer: '',
    },
    false
  )

  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [cardExpMonth, setCardExpMonth] = useState('')
  const [cardExpYear, setCardExpYear] = useState('')
  const [cardCVV, setCardCVV] = useState('')
  const [errors, setErrors] = useState<IErrors>({
    cardNumber: '',
    cardHolder: '',
    cardExpMonth: '',
    cardExpYear: '',
    cardCVV: '',
    hasErrors: false,
  })

  const resetErrors = () => {
    setErrors({
      cardNumber: '',
      cardHolder: '',
      cardExpMonth: '',
      cardExpYear: '',
      cardCVV: '',
      hasErrors: false,
    })
  }

  const handlePayment = () => {
    resetErrors()
    let hasErrors = false
    const isCreditCardValid = isValidCardNumber(cardNumber)
    if (typeof isCreditCardValid === 'string') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardNumber: isCreditCardValid,
      }))
      hasErrors = true
    }
    if (!cardHolder) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardHolder: 'Card Holder is Required',
      }))
      hasErrors = true
    }
    if (!cardExpMonth) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardExpMonth: 'Card Expire Month is Required',
      }))
      hasErrors = true
    }
    if (!cardExpYear) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardExpYear: 'Card Expire Year is Required',
      }))
      hasErrors = true
    }
    if (!cardCVV) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardCVV: 'Card CVV Year is Required',
      }))
      hasErrors = true
    }
    if (!hasErrors) {
      console.log(errors, !errors.hasErrors, hasErrors)
      manualPayment(
        {
          credit_card: cardNumber,
          card_holder_name: cardHolder,
          expire_date: `${cardExpMonth}/${cardExpYear}`,
          cvv: cardCVV,
        },

        () => {
          console.log('Success')
          resetErrors()
        },
        () => console.log('Error')
      )
    }
  }

  const handleInputChange = (
    element:
      | 'cardNumber'
      | 'cardHolder'
      | 'cardExpMonth'
      | 'cardExpYear'
      | 'cardCVV',
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    switch (element) {
      case 'cardNumber': {
        if (event.target.value.length > 19) return
        const value = event.target.value
          .replace(/[^0-9]+/gi, '')
          .replace(/(.{4})/g, '$1 ')
          .trim()
        return setCardNumber(value)
      }
      case 'cardHolder':
        return setCardHolder(event.target.value)
      case 'cardExpMonth':
        return setCardExpMonth(event.target.value)
      case 'cardExpYear':
        return setCardExpYear(event.target.value)
      case 'cardCVV': {
        if (event.target.value.length > 3) return
        const value = event.target.value.replace(/[^0-9]+/gi, '').trim()
        return setCardCVV(value)
      }
    }
  }
  return (
    <div className="bg-slate-300 h-screen">
      <div className="max-w-2xl mx-auto pt-5 relative">
        <CreditCard
          cardNumber={cardNumber}
          cardHolder={cardHolder}
          cardExpMonth={cardExpMonth}
          cardExpYear={cardExpYear}
          cardCVV={cardCVV}
        />
        <div
          className="mb-5 mt-[-50px] p-5 pt-[50px] bg-white border-neutral-400 rounded-md shadow-xl"
          data-cy="creditCardFormContainer"
        >
          <div className="flex items-start flex-col uppercase my-5">
            <label htmlFor="creditCardNumber" className="text-neutral-400">
              Card Number
            </label>
            <input
              type="text"
              className={`rounded-xl w-full border-neutral-400 ${
                errors['cardNumber'] && 'border-rose-600'
              }`}
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e)}
            />
            {errors['cardNumber'] && (
              <div className="text-rose-600 text-xs capitalize">
                {errors['cardNumber']}
              </div>
            )}
          </div>
          <div className="flex items-start flex-col uppercase my-5">
            <label htmlFor="creditCardNumber" className="text-neutral-400">
              Card Holder
            </label>
            <input
              type="text"
              className={`rounded-xl w-full border-neutral-400 ${
                errors['cardHolder'] && 'border-rose-600'
              }`}
              placeholder="John Doe"
              value={cardHolder}
              onChange={(e) => handleInputChange('cardHolder', e)}
            />
            {errors['cardHolder'] && (
              <div className="text-rose-600 text-xs capitalize">
                {errors['cardHolder']}
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-between my-5">
            <div className="flex mb-5 md:my-0 items-start flex-col uppercase">
              <label htmlFor="creditCardNumber" className="text-neutral-400">
                Expiration Month
              </label>
              <select
                className={`rounded-xl w-full border-neutral-400 ${
                  errors['cardExpMonth'] && 'border-rose-600'
                }`}
                placeholder="00"
                value={cardExpMonth}
                onChange={(e) => handleInputChange('cardExpMonth', e)}
              >
                {range(1, 13).map((value) => (
                  <option
                    key={value}
                    value={padStart(value.toString(), 2, '0')}
                  >
                    {padStart(value.toString(), 2, '0')}
                  </option>
                ))}
              </select>
              {errors['cardExpMonth'] && (
                <div className="text-rose-600 text-xs capitalize">
                  {errors['cardExpMonth']}
                </div>
              )}
            </div>
            <div className="flex mb-5 md:my-0 items-start flex-col uppercase">
              <label htmlFor="creditCardNumber" className="text-neutral-400">
                Expiration Year
              </label>
              <select
                className={`rounded-xl w-full border-neutral-400 ${
                  errors['cardExpYear'] && 'border-rose-600'
                }`}
                placeholder="00"
                value={cardExpYear}
                onChange={(e) => handleInputChange('cardExpYear', e)}
              >
                {range(22, 61).map((value) => (
                  <option key={value} value={value}>
                    {padStart(value.toString(), 4, '20')}
                  </option>
                ))}
              </select>
              {errors['cardExpYear'] && (
                <div className="text-rose-600 text-xs capitalize">
                  {errors['cardExpYear']}
                </div>
              )}
            </div>
            <div className="flex mb-5 md:my-0 items-start flex-col uppercase">
              <label htmlFor="creditCardNumber" className="text-neutral-400">
                CVV
              </label>
              <input
                type="text"
                className={`rounded-xl w-full border-neutral-400 ${
                  errors['cardCVV'] && 'border-rose-600'
                }`}
                placeholder="000"
                value={cardCVV}
                onChange={(e) => handleInputChange('cardCVV', e)}
              />
              {errors['cardCVV'] && (
                <div className="text-rose-600 text-xs capitalize">
                  {errors['cardCVV']}
                </div>
              )}
            </div>
          </div>
          <button
            className="w-full uppercase shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-5 rounded-xl text-white font-bold"
            onClick={handlePayment}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomCreditCard
