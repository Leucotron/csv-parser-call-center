import { Express, Router } from 'express'
import { sync } from 'fast-glob'
import env from './env'

export default (app: Express): void => {
  const router = Router()
  app.use(`${env.context}/api/v1`, router)
  const dir = env.isProd ? '**/dist/main/routes/**routes.js' : '**/src/main/routes/**routes.ts'
  sync(dir)
    .map(async file => (await import(`../../../${file}`)).default(router))
}
