import { MailingModel } from '../models/mailing'

export interface AddMailingModel {
  delimiter: string
  headers: {[key: string]: string}
  path: string
  campaignId: number
}

export interface AddMailing {
  add: (mailing: AddMailingModel) => MailingModel[]
}
