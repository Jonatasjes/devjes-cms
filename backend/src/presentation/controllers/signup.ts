import { MissingParameterError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.first_name) {
      return {
        statusCode: 400,
        body: new MissingParameterError('first_name')
      }
    }

    if (!httpRequest.body.last_name) {
      return {
        statusCode: 400,
        body: new MissingParameterError('last_name')
      }
    }

    if (!httpRequest.body.username) {
      return {
        statusCode: 400,
        body: new MissingParameterError('username')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParameterError('email')
      }
    }

    return {
      statusCode: 400,
      body: new MissingParameterError('Missing all param')
    }
  }
}
