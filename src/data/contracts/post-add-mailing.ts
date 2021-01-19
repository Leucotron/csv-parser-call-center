import { MailingModel } from '../../domain/models/mailing'

export interface PostAddMailing {
  post: (url: string, body: MailingModel[]) => Promise<any>
}
