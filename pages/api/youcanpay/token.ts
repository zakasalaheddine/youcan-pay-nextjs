/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { YOUCAN_PRIVATE_KEY } from 'utils/constants'
import { generateToken } from 'utils/youcan-api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!YOUCAN_PRIVATE_KEY) return res.status(400).json({ message: 'Something is missing...' })
  const orderOption = {
    pri_key: YOUCAN_PRIVATE_KEY,
    amount: 3000.00,
    currency: "MAD",
    order_id: '2033',
    success_url: 'http://localhost:3000/success',
    error_url: 'http://localhost:3000/error',
    customer_ip: '255.244.255.0',
    customer: {
      name: 'Salah Eddine',
      streetAddress: 'Testing'
    },
    metadata: {}
  }
  const response = await generateToken(orderOption)
  res.status(200).json({ token: response.token.id })
}