import { MailingModel } from '../../domain/models/mailing'
import { Parser } from '../contracts/parser'
import { PostAddMailing } from '../contracts/post-add-mailing'
import { RestAddMailing } from './rest-add-mailing'
describe('Rest Add Mailing', () => {
  const makeParserStub = (): Parser => {
    class ParserStub implements Parser {
      parse (): MailingModel[] {
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
    return new ParserStub()
  }

  const makePostAddMailingStub = (): PostAddMailing => {
    class PostAddMailingStub implements PostAddMailing {
      async post (url: string, body: MailingModel[]): Promise<any> {
        return new Promise(resolve => resolve(null))
      }
    }
    return new PostAddMailingStub()
  }

  interface SutTypes {
    sut: RestAddMailing
    parserStub: Parser
    postAddMailingStub: PostAddMailing
  }
  const makeSut = (): SutTypes => {
    const parserStub = makeParserStub()
    const postAddMailingStub = makePostAddMailingStub()
    const sut = new RestAddMailing(parserStub, postAddMailingStub)
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
      headers: ['designed_header']
    })
  })

  test('Should throw if Parser throws', async () => {
    const { parserStub, sut } = makeSut()
    jest.spyOn(parserStub, 'parse').mockImplementation((): MailingModel[] => {
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

  test('Should call PostAddMailing with correct params', () => {
    const { postAddMailingStub, sut } = makeSut()
    const postSpy = jest.spyOn(postAddMailingStub, 'post')
    sut.add({
      campaignId: 1,
      delimiter: 'any_delimiter',
      headers: {
        defaultHeader: 'designed_header'
      },
      path: 'any_path'
    })
    expect(postSpy).toHaveBeenCalledWith('any_path', [
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
