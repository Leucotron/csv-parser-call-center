import { PostAddMailing, Parser, AddMailing, AddMailingModel, MailingModel } from './rest-add-mailing-contracts'
import { bindHeaders } from '../../helpers/header.helper'

export class RestAddMailing implements AddMailing {
  private readonly URL_API: string
  constructor (
    private readonly parser: Parser,
    private readonly postAddMailing: PostAddMailing,
    url: string) {
    this.URL_API = url
  }

  async add (mailing: AddMailingModel): Promise<MailingModel[]> {
    const { path, delimiter, headers, campaignId } = mailing
    const mailings = await this.parser.parse(path, { delimiter, headers: bindHeaders(headers) })
    await this.postAddMailing.post(this.URL_API, { campaignId, mailings })
    return mailings
  }
}
