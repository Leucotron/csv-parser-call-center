import { UploadMailingController } from './upload-mailing'

describe('Upload Mailing Controller', () => {
  test('Should return an 400 if no delimiter is provided', () => {
    const sut = new UploadMailingController()
    const httpRequest = {
      body: {
        delimiter: 'valid_delimiter',
        header: {
          defaultHeader: 'designed_header'
        }
      },
      file: 'file_content'
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Field delimiter should be provided'))
  })
})
