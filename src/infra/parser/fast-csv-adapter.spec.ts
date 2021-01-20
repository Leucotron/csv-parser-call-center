import { FastCSVAdapter } from './fast-csv-adapter'
import fc from 'fast-csv'
import EventEmitter from 'events'
import { MailingRows } from './contracts/mailing-rows'
import { MailingModel } from '../../domain/models/mailing'

interface CsvParserStreamAdapter {
  transform: (cb: (row: MailingRows) => MailingModel) => EventEmitter
}
jest.mock('fast-csv', () => ({
  parseFile (): CsvParserStreamAdapter {
    const row: MailingRows =
      {
        cnpj: 'any_cnpj',
        nome: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
        cep: 'any_cep',
        cidade: 'any_city',
        complemento: 'any_complement',
        pais: 'any_country',
        bairro: 'any_neighborhood',
        numero: 123,
        estado: 'any_state',
        endereco: 'any_street',
        telefone1: 'any_phone'
      }
    const transform = (cb: (row: MailingRows) => MailingModel): EventEmitter => {
      const data = new EventEmitter()
      setTimeout(() => { data.emit('data', cb(row)) }, 50)
      setTimeout(() => { data.emit('end', 1) }, 100)
      return data
    }
    return { transform }
  }
}))

describe('Fast CSV Adapter', () => {
  const makeSut = (): FastCSVAdapter => {
    return new FastCSVAdapter()
  }

  test('Should calls parse with correct values', async () => {
    const sut = makeSut()
    const parseSpy = jest.spyOn(sut, 'parse')
    await sut.parse('any_path', { delimiter: 'any_delimiter', headers: ['any_header'] })
    expect(parseSpy).toHaveBeenCalledWith('any_path',
      {
        delimiter: 'any_delimiter',
        headers: ['any_header']
      }
    )
  })

  test('Should calls fast-csv with correct values', async () => {
    const sut = makeSut()
    const parseFileSpy = jest.spyOn(fc, 'parseFile')
    await sut.parse('any_path', { delimiter: 'any_delimiter', headers: ['any_header'] })
    expect(parseFileSpy).toHaveBeenCalledWith('any_path',
      {
        delimiter: 'any_delimiter',
        headers: ['any_header']
      }
    )
  })

  test('Should return a list of mailings on success', async () => {
    const sut = makeSut()
    const mailings = await sut.parse('any_path', { delimiter: 'any_delimiter', headers: ['any_header'] })
    expect(mailings).toEqual(
      [
        {
          cnpj: 'any_cnpj',
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
      ]
    )
  })

  test('Should throw if fast-csv throws', async () => {
    const sut = makeSut()
    jest.spyOn(fc, 'parseFile').mockImplementation((): any => {
      const transform = (): EventEmitter => {
        const data = new EventEmitter()
        setTimeout(() => { data.emit('error', new Error()) }, 50)
        return data
      }
      return { transform }
    })
    const promise = sut.parse('any_path', { delimiter: 'any_delimiter', headers: ['any_header'] })
    await expect(promise).rejects.toThrow()
  })
})
