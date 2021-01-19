import { MailingModel } from '../../domain/models/mailing'
import { AddMailing } from '../../domain/usecases/add-mailing'
import { Controller } from '../contracts/controller'
import { HttpRequest, HttpResponse } from '../contracts/http'
import { MissingFieldError } from '../errors/missing-field.error'
import { badRequest, serverError, created } from '../helpers/http.helper'
export class UploadMailingController implements Controller {
  private readonly fields = ['header', 'delimiter', 'campaignId']
  constructor (private readonly addMailing: AddMailing) {}
  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const { body, file } = httpRequest
      for (const field of this.fields) {
        if (!body[field]) return badRequest(new MissingFieldError(field))
      }
      if (!file) return badRequest(new MissingFieldError('file'))
      const { header, delimiter, campaignId } = body
      const mailings = this.addMailing.add({ campaignId, headers: header, delimiter, path: file.path })
      return created<MailingModel[]>(mailings)
    } catch (error) {
      return serverError()
    }
  }
}
