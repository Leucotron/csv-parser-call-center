import { FastCSVAdapter } from './fast-csv-adapter'
import fc from 'fast-csv'

jest.mock('fast-csv', () => ({
  parseFile (): fc.CsvParserStream<any, any> {
    return null
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
