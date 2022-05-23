import Image from 'next/image'
import { detectCardType } from 'utils/credit-card-type'

interface ICreditCard {
  cardNumber: string
  cardHolder: string
  cardExpMonth: string
  cardExpYear: string
  cardCVV: string
}
const CreditCard = ({
  cardNumber,
  cardHolder,
  cardExpMonth,
  cardExpYear,
  cardCVV
}: ICreditCard) => {
  return (
    <div className="relative w-2/3 mx-auto shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-5 rounded-xl text-white font-bold">
      <div className="flex items-center justify-between">
        <Image
          src="/assets/icons8-chip-card-80.png"
          alt="Chip Credit Card"
          height="80"
          width="80"
        />
        {detectCardType(cardNumber.split(' ').join('')) !== 'none' && (
          <div className="relative w-1/3 h-[80px]">
            <Image
              src={`/assets/${detectCardType(
                cardNumber.split(' ').join('')
              )}.svg`}
              alt="Chip Credit Card"
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}
      </div>
      <div className="text-center text-xl my-5">
        {cardNumber || '0000 0000 0000 0000'}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="block font-light text-neutral-100 uppercase">
            Card Holder:
          </span>
          <span className="uppercase">{cardHolder || 'John Doe'}</span>
        </div>
        <div>
          <span className="block font-light text-neutral-100 uppercase">
            Expires:
          </span>
          {cardExpMonth || '00'}/{cardExpYear || '00'}
        </div>
        <div>
          <span className="block font-light text-neutral-100 uppercase">
            CVV:
          </span>
          {cardCVV || '000'}
        </div>
      </div>
    </div>
  )
}

export default CreditCard
