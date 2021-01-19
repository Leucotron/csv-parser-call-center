import { UploadMailingController } from './upload-mailing'
import { MissingFieldError } from '../errors/missing-field.error'
import { ServerError } from '../errors/server.error'
import { MailingModel } from '../../domain/models/mailing'
import { AddMailing, AddMailingModel } from '../../domain/usecases/add-mailing'

describe('Upload Mailing Controller', () => {
  const makeAddMailing = (): AddMailing => {
    class AddMailingStub implements AddMailing {
      add (mailing: AddMailingModel): MailingModel[] {
        return [
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
            }
          }
        ]
      }
    }
    return new AddMailingStub()
  }
  interface SutTypes {
    sut: UploadMailingController
    addMailingStub: AddMailing
  }
  const makeSut = (): SutTypes => {
    const addMailingStub = makeAddMailing()
    const sut = new UploadMailingController(addMailingStub)
    return {
      sut,
      addMailingStub: addMailingStub
    }
  }
  test('Should return an 400 if no delimiter is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        header: {
          defaultHeader: 'designed_header'
        },
        campaignId: 'valid_id'
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
        delimiter: 'valid_delimiter',
        campaignId: 'valid_id'
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
        campaignId: 'valid_id',
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
    const { sut, addMailingStub } = makeSut()
    jest.spyOn(addMailingStub, 'add').mockImplementation((): MailingModel[] => {
      throw new ServerError()
    })
    const httpRequest = {
      body: {
        delimiter: 'valid_delimiter',
        campaignId: 'valid_id',
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

  test('Should calls AddMailing with correct params', () => {
    const { sut, addMailingStub } = makeSut()
    const spyAdd = jest.spyOn(addMailingStub, 'add')
    const httpRequest = {
      body: {
        delimiter: 'valid_delimiter',
        campaignId: 'valid_id',
        header: {
          defaultHeader: 'designed_header'
        }
      },
      file: {
        path: 'valid_path'
      }
    }
    sut.handle(httpRequest)
    expect(spyAdd).toHaveBeenCalledWith({
      delimiter: 'valid_delimiter',
      campaignId: 'valid_id',
      headers: {
        defaultHeader: 'designed_header'
      },
      path: 'valid_path'
    })
  })

  test('Should return an 201 on success', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        delimiter: 'valid_delimiter',
        campaignId: 'valid_id',
        header: {
          defaultHeader: 'designed_header'
        }
      },
      file: {
        path: 'valid_path'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual([
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
        }
      }
    ])
  })
})
