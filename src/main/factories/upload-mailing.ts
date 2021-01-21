import { UploadMailingController } from '../../presentation/controllers/upload-mailing/upload-mailing'
import { RestAddMailing } from '../../data/usecases/add-mailing/rest-add-mailing'
import { AxiosAdapter } from '../../infra/api/post/axios-adapter'
import { FastCSVAdapter } from '../../infra/parser/fast-csv-adapter'

export const makeUploadMailingController = (): UploadMailingController => {
  const fastCsvAdapter = new FastCSVAdapter()
  const axiosAdapter = new AxiosAdapter()
  const restAddMailing = new RestAddMailing(fastCsvAdapter, axiosAdapter)
  return new UploadMailingController(restAddMailing)
}
