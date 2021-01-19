import { MailingModel } from '../../domain/models/mailing'
import { AddMailing, AddMailingModel } from '../../domain/usecases/add-mailing'
import { Parser } from '../contracts/parser'
import { PostAddMailing } from '../contracts/post-add-mailing'
import { bindHeaders } from '../helpers/header.helper'

export class RestAddMailing implements AddMailing {
  constructor (private readonly parser: Parser, private readonly postAddMailing: PostAddMailing) {}
  add (mailing: AddMailingModel): MailingModel[] {
    const { path, delimiter, headers } = mailing
    const mailings = this.parser.parse(path, { delimiter, headers: bindHeaders(headers) })
    this.postAddMailing.post('any_path', mailings)
    return mailings
  }
}
