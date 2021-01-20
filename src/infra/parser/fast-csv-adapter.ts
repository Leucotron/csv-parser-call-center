import { Parser } from '../../data/contracts/parser'
import { MailingModel } from '../../domain/models/mailing'
import { ParserOptionsArgs, parseFile } from 'fast-csv'

export class FastCSVAdapter implements Parser {
  parse (path: string, opts: ParserOptionsArgs): MailingModel[] {
    const mailings = []
    parseFile<any, MailingModel>(path, opts)
      .transform((data) => ({
        name: '',
        cpf: '',
        cnpj: '',
        email: '',
        address: {
          street: '',
          number: 0,
          cep: '',
          city: '',
          complement: '',
          country: '',
          neighborhood: '',
          state: ''
        },
        responsibleContact: '',
        contactCode: '',
        campaignId: ''
      }))
      .on('error', error => {
        throw error
      })
      .on('data', (row: MailingModel) => mailings.push(row))
      .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`))
    return mailings
  }
}
