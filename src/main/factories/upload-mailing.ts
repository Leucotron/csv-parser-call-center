import { UploadMailingController } from '../../presentation/controllers/upload-mailing/upload-mailing'
import { RestAddMailing } from '../../data/usecases/add-mailing/rest-add-mailing'
import { AxiosAdapter } from '../../infra/api/post/axios-adapter'
import { FastCSVAdapter } from '../../infra/parser/fast-csv-adapter'
import env from '../config/env'

export const makeUploadMailingController = (): UploadMailingController => {
  const url = `${env.dialerAPI}/mailing`
  const opts = {
    discardUnmappedColumns: true,
    renameHeaders: true
  }
  const fastCsvAdapter = new FastCSVAdapter(opts)
  const axiosAdapter = new AxiosAdapter()
  const restAddMailing = new RestAddMailing(fastCsvAdapter, axiosAdapter, url)
  return new UploadMailingController(restAddMailing)
}
