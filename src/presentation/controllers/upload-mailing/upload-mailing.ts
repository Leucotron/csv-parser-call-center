import { MailingModel, AddMailing, Controller, HttpRequest, HttpResponse } from './upload-mailing-contracts'
import { MissingFieldError } from '../../errors/missing-field.error'
import { badRequest, serverError, created } from '../../helpers/http.helper'
export class UploadMailingController implements Controller {
  private readonly fields = ['header', 'delimiter', 'campaignId']
  constructor (private readonly addMailing: AddMailing) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, file } = httpRequest
      for (const field of this.fields) {
        if (!body[field]) return badRequest(new MissingFieldError(field))
      }
      if (!file) return badRequest(new MissingFieldError('file'))
      const { header, delimiter, campaignId } = body
      const mailings = await this.addMailing.add({ campaignId, headers: JSON.parse(header), delimiter, path: file.path })
      return created<MailingModel[]>(mailings)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
