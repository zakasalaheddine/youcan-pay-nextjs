import { YOUCAN_API_BASE_URL } from "./constants"

export const postToYouCanPay = async (endPoint: string, body: object) => {
  const response = await fetch(`${YOUCAN_API_BASE_URL}${endPoint}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const results = await response.json()
  return results
}