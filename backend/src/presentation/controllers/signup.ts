import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import {
  HttpRequest,
  HttpResponse,
  EmailValidator,
  Controller
} from '../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'first_name',
        'last_name',
        'username',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return badRequest(new MissingParamError('Missing all param'))
    } catch (error) {
      return serverError()
    }
  }
}
