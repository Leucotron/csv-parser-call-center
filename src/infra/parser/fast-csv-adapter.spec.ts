import { FastCSVAdapter } from './fast-csv-adapter'

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
})
