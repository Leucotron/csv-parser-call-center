import { FastCSVAdapter } from './fast-csv-adapter'
import fc from 'fast-csv'
import EventEmitter from 'events'
import { MailingModel } from 'src/domain/models/mailing'

interface CsvParserStreamAdapter {
  transform: () => EventEmitter
}
jest.mock('fast-csv', () => ({
  parseFile (): CsvParserStreamAdapter {
    const transform = (): EventEmitter => {
      const data = new EventEmitter()
      const mailing: MailingModel =
        {
          campaignId: 'any_id',
          cnpj: 'any_cnpj',
          contactCode: 'any_contact_code',
          responsibleContact: 'any_responsibleContact',
          name: 'any_name',
          cpf: 'any_cpf',
          email: 'any_email@mail.com',
          address: {
            cep: 'any_cep',
            city: 'any_city',
            complement: 'any_complement',
            country: 'any_country',
            neighborhood: 'any_neighborhood',
            number: 123,
            state: 'any_state',
            street: 'any_street'
          },
          phones: ['any_phone']
        }
      data.emit('data', mailing)
      return data
    }
    return { transform }
  }
}))
describe('Fast CSV Adapter', () => {
  test('Should calls parse with correct values', () => {
    const sut = new FastCSVAdapter()
    const parseSpy = jest.spyOn(sut, 'parse')
    sut.parse('any_path', { delimiter: 'any_delimiter', headers: ['any_header'] })
    expect(parseSpy).toHaveBeenCalledWith('any_path',
      {
        delimiter: 'any_delimiter',
        headers: ['any_header']
      }
    )
  })

  test('Should calls fast csv with correct values', () => {
    const sut = new FastCSVAdapter()
    const parseFileSpy = jest.spyOn(fc, 'parseFile')
    sut.parse('any_path', { delimiter: 'any_delimiter', headers: ['any_header'] })
    expect(parseFileSpy).toHaveBeenCalledWith('any_path',
      {
        delimiter: 'any_delimiter',
        headers: ['any_header']
      }
    )
  })
})
