/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { YOUCAN_PRIVATE_KEY, YOUCAN_SUCCESS_URL, YOUCAN_ERROR_URL, YOUCAN_API_TEST_MODE, YOUCAN_SANDBOX_PRIVATE_KEY } from 'utils/constants'
import { generateToken } from 'utils/youcan-api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!YOUCAN_PRIVATE_KEY) return res.status(400).json({ message: 'Something is missing...' })
  const userIPAddress = req.headers['x-real-ip'] || req.socket.remoteAddress || '255.255.255.0'
  const orderOption = {
    pri_key: YOUCAN_API_TEST_MODE
      ? YOUCAN_SANDBOX_PRIVATE_KEY
      : YOUCAN_PRIVATE_KEY,
    amount: 3000.00,
    currency: "MAD",
    order_id: '2033',
    success_url: YOUCAN_SUCCESS_URL,
    error_url: YOUCAN_ERROR_URL,
    customer_ip: userIPAddress,
    customer: {
      name: 'Salah Eddine',
      streetAddress: 'Testing'
    },
    metadata: {}
  }
  try {
    const response = await generateToken(orderOption)
    res.status(200).json({ token: response.token.id })
  } catch (error) {
    res.status(200).json({ error, token: '' })
  }

}