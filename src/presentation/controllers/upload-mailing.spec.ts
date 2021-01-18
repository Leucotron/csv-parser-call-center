import { UploadMailingController } from './upload-mailing'
import { MissingFieldError } from '../errors/missing-field.error'
import { ServerError } from '../errors/server.error'
import { ParseCSV } from '../../domain/usecases/parse-csv'
import { ParserOptions } from '@fast-csv/parse'
import { MailingModel } from '../../domain/models/mailing'

describe('Upload Mailing Controller', () => {
  const makeParseCSV = (): ParseCSV => {
    class ParseCSVStub implements ParseCSV {
      parseFile (path: string, opts: ParserOptions): MailingModel {
        return {
          email: 'valid_mail@email.com',
          name: 'valid_name',
          phones: [
            'valid_phone'
          ]
        }
      }
    }

    return new ParseCSVStub()
  }
  interface SutTypes {
    sut: UploadMailingController
    parseCSVStub: ParseCSV
  }
  const makeSut = (): SutTypes => {
    const parseCSVStub = makeParseCSV()
    const sut = new UploadMailingController(parseCSVStub)
    return {
      sut,
      parseCSVStub
    }
  }
  test('Should return an 400 if no delimiter is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        header: {
          defaultHeader: 'designed_header'
        }
      },
      file: {
        path: 'valid_path'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('delimiter'))
  })

  test('Should return an 400 if no header is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        delimiter: 'valid_delimiter'
      },
      file: {
        path: 'valid_path'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('header'))
  })

  test('Should return an 400 if no file is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        delimiter: 'valid_delimiter',
        header: {
          defaultHeader: 'designed_header'
        }
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('file'))
  })

  test('Should return an 500 if csvParser throws', () => {
    const { sut, parseCSVStub } = makeSut()
    jest.spyOn(parseCSVStub, 'parseFile').mockImplementation((): MailingModel => {
      throw new ServerError()
    })
    const httpRequest = {
      body: {
        delimiter: 'valid_delimiter',
        header: {
          defaultHeader: 'designed_header'
        }
      },
      file: {
        path: 'valid_path'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should calls ParseCSV with correct params', () => {
    const { sut, parseCSVStub } = makeSut()
    const spyParseFile = jest.spyOn(parseCSVStub, 'parseFile')
    const httpRequest = {
      body: {
        delimiter: 'valid_delimiter',
        header: {
          defaultHeader: 'designed_header'
        }
      },
      file: {
        path: 'valid_path'
      }
    }
    sut.handle(httpRequest)
    expect(spyParseFile).toHaveBeenCalledWith('valid_path', {
      delimiter: 'valid_delimiter',
      headers: {
        defaultHeader: 'designed_header'
      }
    })
  })
})
