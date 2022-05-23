import { detectCardType } from "./credit-card-type"

export const isValidCardNumber = (number: string) => {
  if (!number) return 'Credit Card Number is Required'
  if (detectCardType(number.split(' ').join('')) === 'none') return 'Credit Card Number is Invalid'
  if (number.split(' ').join('').length !== 16) return 'Credit Card Number is Invalid'
  if (/^[a-zA-Z]+$/.test(number.split(' ').join(''))) return 'Credit Card Number is Invalid'
  return true
}