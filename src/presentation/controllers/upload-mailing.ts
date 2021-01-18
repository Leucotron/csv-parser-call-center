import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
export class UploadMailingController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new Error('Field delimiter should be provided')
    }
  }
}
