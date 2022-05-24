import { detectCardType } from "utils/credit-card-type";

type CardsType = {
  [key: string]: string
}
export { }
describe('detect Credit Card Type', () => {
  const cards: CardsType = {
    '8800000000000000': 'unionpay',

    '4026000000000000': 'electron',
    '4175000000000000': 'electron',
    '4405000000000000': 'electron',
    '4508000000000000': 'electron',
    '4844000000000000': 'electron',
    '4913000000000000': 'electron',
    '4917000000000000': 'electron',

    '5019000000000000': 'dankort',

    '5018000000000000': 'maestro',
    '5020000000000000': 'maestro',
    '5038000000000000': 'maestro',
    '5612000000000000': 'maestro',
    '5893000000000000': 'maestro',
    '6304000000000000': 'maestro',
    '6759000000000000': 'maestro',
    '6761000000000000': 'maestro',
    '6762000000000000': 'maestro',
    '6763000000000000': 'maestro',
    '0604000000000000': 'maestro',
    '6390000000000000': 'maestro',

    '3528000000000000': 'jcb',
    '3589000000000000': 'jcb',
    '3529000000000000': 'jcb',

    '6360000000000000': 'interpayment',

    '4916338506082832': 'visa',
    '4556015886206505': 'visa',
    '4539048040151731': 'visa',
    '4024007198964305': 'visa',
    '4716175187624512': 'visa',

    '5280934283171080': 'mastercard',
    '5456060454627409': 'mastercard',
    '5331113404316994': 'mastercard',
    '5259474113320034': 'mastercard',
    '5442179619690834': 'mastercard',

    '6011894492395579': 'discover',
    '6011388644154687': 'discover',
    '6011880085013612': 'discover',
    '6011652795433988': 'discover',
    '6011375973328347': 'discover',

    '345936346788903': 'amex',
    '377669501013152': 'amex',
    '373083634595479': 'amex',
    '370710819865268': 'amex',
    '371095063560404': 'amex'
  }
  Object.keys(cards).forEach(function (number) {
    it('should detect card ' + number + ' as ' + cards[number], function () {
      expect(detectCardType(number)).toBe(cards[number]);
    });
  });
})