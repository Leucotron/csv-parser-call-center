import { ParserOptionsArgs } from '@fast-csv/parse'
interface MailingRow {
  name: string
  email: string
  phone1: string
  phone2: string
  phone3: string
}

type TransformedMailingRow = Omit<MailingRow, 'phone1' | 'phone2' | 'phone3'> & {
  phones: string[]
}

export interface ParseCSV {
  parseFile: (path: string, opts: ParserOptionsArgs) => TransformedMailingRow
}
