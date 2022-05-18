import { postToYouCanPay } from "./post-youcan-pay"

type tokenParams = {
  pri_key: string
  amount: number
  currency: string
  order_id: string
  success_url: string
  error_url: string
  customer_ip: string
  customer: object | undefined
  metadata: object | undefined
}

export const generateToken = async (params: tokenParams) => {
  const response = await postToYouCanPay('/tokenize', params)
  return response
}