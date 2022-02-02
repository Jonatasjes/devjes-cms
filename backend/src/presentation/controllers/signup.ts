import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.first_name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: first_name')
      }
    }

    if (!httpRequest.body.last_name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: last_name')
      }
    }

    if (!httpRequest.body.username) {
      return {
        statusCode: 400,
        body: new Error('Missing param: username')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }

    return {
      statusCode: 400,
      body: new Error('Missing all param')
    }
  }
}
