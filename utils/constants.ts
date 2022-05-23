export const YOUCAN_PRIVATE_KEY = process.env.YOUCAN_PAY_PRIVATE_KEY || ''
export const YOUCAN_PUBLIC_KEY = process.env.NEXT_PUBLIC_YOUCAN_PAY_PUBLIC_KEY || ''

export const YOUCAN_SANDBOX_PRIVATE_KEY = process.env.YOUCAN_SANDBOX_PRIVATE_KEY || ''
export const YOUCAN_SANDBOX_PUBLIC_KEY = process.env.NEXT_PUBLIC_YOUCAN_SANDBOX_PUBLIC_KEY || ''

export const YOUCAN_API_API_URL = process.env.NEXT_PUBLIC_YOUCAN_PAY_API_URL
export const YOUCAN_API_TEST_MODE = Boolean(process.env.NEXT_PUBLIC_YOUCAN_PAY_TEST_MODE) || false

export const YOUCAN_SUCCESS_URL = process.env.YOUCAN_PAY_SUCCESS_URL || ''
export const YOUCAN_ERROR_URL = process.env.YOUCAN_PAY_ERROR_URL || ''

export const YOUCAN_API_BASE_URL = `${YOUCAN_API_API_URL}${YOUCAN_API_TEST_MODE ? 'sandbox/api' : 'api'}`