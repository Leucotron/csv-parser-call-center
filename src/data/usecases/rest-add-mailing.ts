import { MailingModel } from '../../domain/models/mailing'
import { AddMailing, AddMailingModel } from '../../domain/usecases/add-mailing'
import { Parser } from '../contracts/parser'
import { bindHeaders } from '../helpers/header.helper'

export class RestAddMailing implements AddMailing {
  constructor (private readonly parser: Parser) {}
  add (mailing: AddMailingModel): MailingModel[] {
    const { path, delimiter, headers } = mailing
    this.parser.parse(path, { delimiter, headers: bindHeaders(headers) })
    return null
  }
}
