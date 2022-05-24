export const getToken = async () => {
  try {
    const response = await fetch('/api/youcanpay/token')
    return await response.json()
  } catch (error) {
    throw new Error(error as string)
  }
}