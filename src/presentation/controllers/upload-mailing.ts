import { httpRequest, httpResponse } from '../contracts/http'
export class UploadMailingController {
  handle (httpRequest: httpRequest): httpResponse {
    return {
      statusCode: 400,
      body: new Error('Field delimiter should be provided')
    }
  }
}
