import { isValidCardNumber } from "utils/is-valide-card-number"

describe('Credit Card Number Validation', () => {
  it('Should Not be Empty Card Number', () => {
    expect(isValidCardNumber('')).toBe('Credit Card Number is Required')
  })

  it('Should Not be wrong Card Number', () => {
    expect(isValidCardNumber('2090 9309 0290 9209')).toBe('Credit Card Number is Invalid')
  })

  it('Should Not be more than 16 characters', () => {
    expect(isValidCardNumber('4242 4242 4242 4242 4')).toBe('Credit Card Number is Invalid')
  })

  it('Should Not be less than 16 characters', () => {
    expect(isValidCardNumber('4242 4242 4242 424')).toBe('Credit Card Number is Invalid')
  })

  it('Should Not contain Alpha Carachters', () => {
    expect(isValidCardNumber('4242 4242 4242 H242')).toBe('Credit Card Number is Invalid')
    expect(isValidCardNumber('4242 4242 4242 a242')).toBe('Credit Card Number is Invalid')
  })

  it('Should return true for valid Card Number', () => {
    expect(isValidCardNumber('4242 4242 4242 4242')).toBe(true)
  })
})