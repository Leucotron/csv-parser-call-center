import { Express, Router } from 'express'
import { sync } from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/api/v1', router)
  sync('**/src/main/routes/**routes.ts')
    .map(async file => (await import(`../../../${file}`)).default(router))
}
