import { rest } from "msw"

export const tokenizeHandler = rest.get('https://youcanpay.com/sandbox/api/tokenize', (req, res, ctx) => {
  return res(
    ctx.json({
      token: {
        id: '324be24a-ed6b-4d0c-9e4b-f272fa0f9993'
      },
    }),
    ctx.status(200),
  )
})