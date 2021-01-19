import { MailingModel } from '../../domain/models/mailing'

export interface Response {
  data: any
  status: number
  statusText: string
}

export interface PostAddMailing {
  post: (url: string, body: MailingModel[]) => Promise<Response>
}
