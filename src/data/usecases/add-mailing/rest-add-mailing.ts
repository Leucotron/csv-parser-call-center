import { PostAddMailing, Parser, AddMailing, AddMailingModel, MailingModel } from './rest-add-mailing-contracts'
import { bindHeaders } from '../../helpers/header.helper'

export class RestAddMailing implements AddMailing {
  constructor (private readonly parser: Parser, private readonly postAddMailing: PostAddMailing) {}
  async add (mailing: AddMailingModel): Promise<MailingModel[]> {
    const { path, delimiter, headers } = mailing
    const mailings = await this.parser.parse(path, { delimiter, headers: bindHeaders(headers) })
    await this.postAddMailing.post('any_path', mailings)
    return mailings
  }
}
