import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { MissingFieldError } from '../errors/missing-field.error'
import { badRequest } from '../helpers/http.helper'
export class UploadMailingController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.delimiter) {
      return badRequest(new MissingFieldError('delimiter'))
    }
    if (!httpRequest.body.header) {
      return badRequest(new MissingFieldError('header'))
    }
    if (!httpRequest.file) {
      return badRequest(new MissingFieldError('file'))
    }
  }
}
