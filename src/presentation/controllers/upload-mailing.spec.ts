import { UploadMailingController } from './upload-mailing'
import { MissingFieldError } from '../errors/missing-field.error'

describe('Upload Mailing Controller', () => {
  test('Should return an 400 if no delimiter is provided', () => {
    const sut = new UploadMailingController()
    const httpRequest = {
      body: {
        header: {
          defaultHeader: 'designed_header'
        }
      },
      file: 'file_content'
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('delimiter'))
  })

  test('Should return an 400 if no header is provided', () => {
    const sut = new UploadMailingController()
    const httpRequest = {
      body: {
        delimiter: 'valid_delimiter'
      },
      file: 'file_content'
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingFieldError('header'))
  })

  test('Should return an 400 if no file is provided', () => {
    const sut = new UploadMailingController()
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
})
