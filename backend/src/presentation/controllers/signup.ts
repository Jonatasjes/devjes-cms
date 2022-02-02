import { MissingParameterError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.first_name) {
      return badRequest(new MissingParameterError('first_name'))
    }

    if (!httpRequest.body.last_name) {
      return badRequest(new MissingParameterError('last_name'))
    }

    if (!httpRequest.body.username) {
      return badRequest(new MissingParameterError('username'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParameterError('email'))
    }

    return badRequest(new MissingParameterError('Missing all param'))
  }
}
