import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
export class UploadMailingController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.delimiter) {
      return {
        statusCode: 400,
        body: new Error('Field delimiter should be provided')
      }
    }
    if (!httpRequest.body.header) {
      return {
        statusCode: 400,
        body: new Error('Field header should be provided')
      }
    }
    if (!httpRequest.file) {
      return {
        statusCode: 400,
        body: new Error('Field file should be provided')
      }
    }
  }
}
