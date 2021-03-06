import { Parser } from '../../data/contracts/parser'
import { MailingModel } from '../../domain/models/mailing'
import { ParserOptionsArgs, parseFile } from 'fast-csv'
import { MailingRows } from './contracts/mailing-rows'
import { mapToMailing, removeUploadCsvFile } from './helpers/csv-mapper.helper'
export class FastCSVAdapter implements Parser {
  private readonly baseOpts: ParserOptionsArgs

  constructor (opts: ParserOptionsArgs) {
    this.baseOpts = opts
  }

  async parse (path: string, opts: ParserOptionsArgs): Promise<MailingModel[]> {
    return new Promise((resolve, reject) => {
      const mailings = []
      parseFile<MailingRows, MailingModel>(path, { ...opts, ...this.baseOpts })
        .transform((data: MailingRows) => mapToMailing(data))
        .on('error', error => {
          removeUploadCsvFile(path)
          reject(error)
        })
        .on('data', (row: MailingModel) => mailings.push(row))
        .on('end', () => {
          removeUploadCsvFile(path)
          resolve(mailings)
        })
    })
  }
}
