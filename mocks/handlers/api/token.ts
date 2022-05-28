import { rest } from "msw"

export const tokenHander = rest.get('/api/youcanpay/token', (req, res, ctx) => {
  return res(
    ctx.json({
      token: '324be24a-ed6b-4d0c-9e4b-f272fa0f9993',
    }),
    ctx.status(200),
  )
})