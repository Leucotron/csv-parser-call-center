import { ParseCSV } from '../../domain/usecases/parse-csv'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { MissingFieldError } from '../errors/missing-field.error'
import { ServerError } from '../errors/server.error'
import { badRequest, serverError } from '../helpers/http.helper'
export class UploadMailingController implements Controller {
  constructor (private readonly parserCSV: ParseCSV) {}
  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body.delimiter) {
        return badRequest(new MissingFieldError('delimiter'))
      }
      if (!httpRequest.body.header) {
        return badRequest(new MissingFieldError('header'))
      }
      if (!httpRequest.file) {
        return badRequest(new MissingFieldError('file'))
      }
      this.parserCSV.parseFile(httpRequest.file.path, { headers: httpRequest.body.header, delimiter: httpRequest.body.delimiter })
    } catch (error) {
      return serverError(new ServerError())
    }
  }
}
