import { ParserOptionsArgs } from '@fast-csv/parse'
import { Parser } from '../../data/contracts/parser'
import { MailingModel } from '../../domain/models/mailing'
import * as fc from 'fast-csv'

export class FastCSVAdapter implements Parser {
  parse (path: string, opts: ParserOptionsArgs): MailingModel[] {
    fc.parseFile(path, opts)
    return null
  }
}
