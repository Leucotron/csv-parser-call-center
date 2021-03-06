import { config } from 'dotenv'

const { NODE_ENV } = process.env

config({
  path: NODE_ENV === 'production' ? '.env' : NODE_ENV === 'test' ? '.env.test' : '.env.development'
})
export default {
  isProd: process.env.IS_PROD === 'true',
  port: process.env.PORT || 9015,
  dialerAPI: `${process.env.DIALER_HOST}/call-center-dialer/api/v1`,
  context: process.env.CONTEXT
}
