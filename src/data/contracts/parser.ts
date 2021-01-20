import { ParserOptionsArgs } from '@fast-csv/parse'
import { MailingModel } from '../../domain/models/mailing'
export interface Parser {
  parse: (path: string, opts: ParserOptionsArgs) => Promise<MailingModel[]>
}
