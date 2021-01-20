import { MailingModel } from '../../domain/models/mailing'

export interface Response {
  data: any
  status: number
  statusText: string
}

export interface PostMailingModel {
  campaignId: number
  mailings: MailingModel[]
}

export interface PostAddMailing {
  post: (url: string, body: PostMailingModel) => Promise<Response>
}
