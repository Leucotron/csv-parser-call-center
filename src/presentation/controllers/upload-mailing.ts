import { ParseCSV } from '../../domain/usecases/parse-csv'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { MissingFieldError } from '../errors/missing-field.error'
import { badRequest, serverError } from '../helpers/http.helper'
export class UploadMailingController implements Controller {
  private readonly fields = ['header', 'delimiter']
  constructor (private readonly parserCSV: ParseCSV) {}
  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const { body, file } = httpRequest
      for (const field of this.fields) {
        if (!body[field]) return badRequest(new MissingFieldError(field))
      }
      if (!file) return badRequest(new MissingFieldError('file'))
      const { header, delimiter } = body
      this.parserCSV.parseFile(file.path, { headers: header, delimiter })
    } catch (error) {
      return serverError()
    }
  }
}
