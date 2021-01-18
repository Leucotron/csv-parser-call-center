import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { MissingFieldError } from '../errors/missing-field.error'
export class UploadMailingController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.delimiter) {
      return {
        statusCode: 400,
        body: new MissingFieldError('delimiter')
      }
    }
    if (!httpRequest.body.header) {
      return {
        statusCode: 400,
        body: new MissingFieldError('header')
      }
    }
    if (!httpRequest.file) {
      return {
        statusCode: 400,
        body: new MissingFieldError('file')
      }
    }
  }
}
