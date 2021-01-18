export class UploadMailingController {
  handle (httpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('Field delimiter should be provided')
    }
  }
}
