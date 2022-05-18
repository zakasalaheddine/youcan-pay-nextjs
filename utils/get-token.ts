export const getToken = async () => {
  const response = await fetch('/api/youcanpay/token')
  return await response.json()
}