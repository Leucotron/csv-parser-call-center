import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route.adapter'
import { makeUploadMailingController } from '../factories/upload-mailing'
import multer from 'multer'

export default (router: Router): void => {
  const upload = multer({ dest: 'uploads/' })
  router.post('/upload', upload.single('mailing'), adaptRoute(makeUploadMailingController()))
}
