import { PostAddMailing, Parser, MailingModel, Response } from './rest-add-mailing-contracts'
import { RestAddMailing } from './rest-add-mailing'
import { PostMailingModel } from 'src/data/contracts/post-add-mailing'
describe('Rest Add Mailing', () => {
  const makeParserStub = (): Parser => {
    class ParserStub implements Parser {
      async parse (): Promise<MailingModel[]> {
        const mailings: MailingModel[] = [
          {
            cnpj: 'any_cnpj',
            name: 'any_name',
            cpf: 'any_cpf',
            email: 'any_email@mail.com',
            zipCode: 'any_cep',
            city: 'any_city',
            complement: 'any_complement',
            country: 'any_country',
            neighborhood: 'any_neighborhood',
            number: 123,
            state: 'any_state',
            street: 'any_street',
            phones: ['any_phone']
          }
        ]
        return new Promise(resolve => resolve(mailings))
      }
    }
    return new ParserStub()
  }

  const makePostAddMailingStub = (): PostAddMailing => {
    class PostAddMailingStub implements PostAddMailing {
      async post (url: string, body: PostMailingModel): Promise<Response> {
        return new Promise(resolve => resolve({
          data: 'valid_data',
          status: 201,
          statusText: 'Created'
        }))
      }
    }
    return new PostAddMailingStub()
  }

  interface SutTypes {
    sut: RestAddMailing
    parserStub: Parser
    postAddMailingStub: PostAddMailing
  }
  const url = 'http://valid_url/api/v1'
  const makeSut = (): SutTypes => {
    const parserStub = makeParserStub()
    const postAddMailingStub = makePostAddMailingStub()
    const sut = new RestAddMailing(parserStub, postAddMailingStub, url)
    return {
      sut,
      parserStub,
      postAddMailingStub
    }
  }
  test('Should call Parser with correct params', () => {
    const { parserStub, sut } = makeSut()
    const parseSpy = jest.spyOn(parserStub, 'parse')
    sut.add({
      campaignId: 1,
      delimiter: 'any_delimiter',
      headers: {
        defaultHeader: 'designed_header'
      },
      path: 'any_path'
    })
    expect(parseSpy).toHaveBeenCalledWith('any_path', {
      delimiter: 'any_delimiter',
      headers: ['defaultHeader']
    })
  })

  test('Should throw if Parser throws', async () => {
    const { parserStub, sut } = makeSut()
    jest.spyOn(parserStub, 'parse').mockImplementation(async (): Promise<MailingModel[]> => {
      throw new Error()
    })
    const promise = sut.add({
      campaignId: 1,
      delimiter: 'any_delimiter',
      headers: {
        defaultHeader: 'designed_header'
      },
      path: 'any_path'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should call PostAddMailing with correct params', async () => {
    const { postAddMailingStub, sut } = makeSut()
    const postSpy = jest.spyOn(postAddMailingStub, 'post')
    await sut.add({
      campaignId: 1,
      delimiter: 'any_delimiter',
      headers: {
        defaultHeader: 'designed_header'
      },
      path: 'any_path'
    })
    expect(postSpy).toHaveBeenCalledWith('http://valid_url/api/v1', {
      campaignId: 1,
      mailings: [
        {
          cnpj: 'any_cnpj',
          name: 'any_name',
          cpf: 'any_cpf',
          email: 'any_email@mail.com',
          zipCode: 'any_cep',
          city: 'any_city',
          complement: 'any_complement',
          country: 'any_country',
          neighborhood: 'any_neighborhood',
          number: 123,
          state: 'any_state',
          street: 'any_street',
          phones: ['any_phone']
        }
      ]
    })
  })

  test('Should throw if PostAddMailing throws', async () => {
    const { postAddMailingStub, sut } = makeSut()
    jest.spyOn(postAddMailingStub, 'post').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add({
      campaignId: 1,
      delimiter: 'any_delimiter',
      headers: {
        defaultHeader: 'designed_header'
      },
      path: 'any_path'
    })
    expect(promise).rejects.toThrow()
  })

  test('Should return an list Mailing on success', async () => {
    const { sut } = makeSut()
    const mailingData = {
      campaignId: 1,
      delimiter: 'any_delimiter',
      headers: {
        defaultHeader: 'designed_header'
      },
      path: 'any_path'
    }
    const mailings = await sut.add(mailingData)
    expect(mailings).toEqual([
      {
        cnpj: 'any_cnpj',
        name: 'any_name',
        cpf: 'any_cpf',
        email: 'any_email@mail.com',
        zipCode: 'any_cep',
        city: 'any_city',
        complement: 'any_complement',
        country: 'any_country',
        neighborhood: 'any_neighborhood',
        number: 123,
        state: 'any_state',
        street: 'any_street',
        phones: ['any_phone']
      }
    ])
  })
})
