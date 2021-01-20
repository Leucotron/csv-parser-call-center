import { ParserOptionsArgs } from '@fast-csv/parse'
import { Parser } from '../../data/contracts/parser'
import { MailingModel } from '../../domain/models/mailing'

export class FastCSVAdapter implements Parser {
  parse (path: string, opts: ParserOptionsArgs): MailingModel[] {
    return null
  }
}
