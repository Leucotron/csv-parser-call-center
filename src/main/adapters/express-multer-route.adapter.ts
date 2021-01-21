import { Controller, HttpRequest } from '../../presentation/contracts'
import { Request, Response } from 'express'

export const adaptMulterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      file: req.file
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).send(httpResponse.body)
  }
}
