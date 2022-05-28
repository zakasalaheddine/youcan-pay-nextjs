import { rest } from "msw"

export const logHandlers =
  rest.post('https://log.youcanpay.com/', (req, res, ctx) => {
    return res(
      ctx.status(200),
    )
  })
