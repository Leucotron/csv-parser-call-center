import { MailingModel } from '../../domain/models/mailing'
import { Parser } from '../contracts/parser'
import { RestAddMailing } from './rest-add-mailing'
describe('Rest Add Mailing', () => {
  const makeParserStub = (): Parser => {
    class ParserStub implements Parser {
      parse (): MailingModel[] {
        return null
      }
    }
    return new ParserStub()
  }
  interface SutTypes {
    sut: RestAddMailing
    parserStub: Parser
  }
  const makeSut = (): SutTypes => {
    const parserStub = makeParserStub()
    const sut = new RestAddMailing(parserStub)
    return {
      sut,
      parserStub
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

  test('Should throw if Parser throws', () => {
    const { parserStub, sut } = makeSut()
    jest.spyOn(parserStub, 'parse').mockImplementation((): MailingModel[] => {
      throw new Error()
    })
    try {
      sut.add({
        campaignId: 1,
        delimiter: 'any_delimiter',
        headers: {
          defaultHeader: 'designed_header'
        },
        path: 'any_path'
      })
    } catch (error) {
      expect(error).toEqual(new Error())
    }
  })
})
