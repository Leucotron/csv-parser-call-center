import { MailingModel } from '../../domain/models/mailing'
import { AddMailing, AddMailingModel } from '../../domain/usecases/add-mailing'
import { Parser } from '../contracts/parser'

export class RestAddMailing implements AddMailing {
  constructor (private readonly parser: Parser) {}
  add (mailing: AddMailingModel): MailingModel[] {
    const { path, delimiter, headers } = mailing
    this.parser.parse(path, { delimiter, headers: headers as any })
    return null
  }
}
