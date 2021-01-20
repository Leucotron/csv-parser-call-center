import { Parser } from '../../data/contracts/parser'
import { MailingModel } from '../../domain/models/mailing'
import { ParserOptionsArgs, parseFile } from 'fast-csv'

export class FastCSVAdapter implements Parser {
  async parse (path: string, opts: ParserOptionsArgs): Promise<MailingModel[]> {
    return new Promise((resolve, reject) => {
      const mailings = []
      parseFile<any, MailingModel>(path, opts)
        .transform((data) => ({
          name: data.nome,
          cpf: data.cpf,
          cnpj: data.cnpj,
          email: data.email,
          address: {
            street: data.endereco,
            number: data.numero,
            cep: data.cep,
            city: data.cidade,
            complement: data.complemento,
            country: data.pais,
            neighborhood: data.bairro,
            state: data.estado
          },
          responsibleContact: 'any_responsible_contact',
          contactCode: 'any_contact_code',
          campaignId: 'valid_id'
        }))
        .on('error', error => {
          reject(error)
        })
        .on('data', (row: MailingModel) => {
          mailings.push(row)
        })
        .on('end', (rowCount: number) => resolve(mailings))
    })
  }
}
