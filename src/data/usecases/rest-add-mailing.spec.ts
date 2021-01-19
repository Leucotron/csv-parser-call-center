import { MailingModel } from '../../domain/models/mailing'
import { Parser } from '../contracts/parser'
import { RestAddMailing } from './rest-add-mailing'
describe('Rest Add Mailing', () => {
  test('Should call Parser with correct params', () => {
    class ParserStub implements Parser {
      parse (): MailingModel[] {
        return null
      }
    }
    const parserStub = new ParserStub()
    const sut = new RestAddMailing(parserStub)
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
      headers: {
        defaultHeader: 'designed_header'
      }
    })
  })
})
