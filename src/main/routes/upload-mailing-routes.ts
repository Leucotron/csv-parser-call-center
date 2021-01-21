import { Router } from 'express'
import { adaptMulterRoute } from '../adapters/express-multer-route.adapter'
import { makeUploadMailingController } from '../factories/upload-mailing'
import multer from 'multer'

export default (router: Router): void => {
  const upload = multer({ dest: 'uploads/' })
  router.post('/upload', upload.single('mailing'), adaptMulterRoute(makeUploadMailingController()))
}
