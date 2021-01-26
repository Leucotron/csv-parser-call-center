import { HttpResponse } from '../contracts/http'
import { ServerError } from '../errors/server.error'

export const badRequest = (error: Error): HttpResponse => (
  {
    statusCode: 400,
    body: error
  }
)

export const serverError = (error: Error): HttpResponse => (
  {
    statusCode: 500,
    body: new ServerError(error)
  }
)

export const created = <T = any>(data: T): HttpResponse => (
  {
    statusCode: 201,
    body: data
  }
)
