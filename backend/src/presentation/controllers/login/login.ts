import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../../protocols/email-validator'

export class LoginController implements Controller {
  private readonly emailValidator
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return new Promise(resolve =>
          resolve(badRequest(new MissingParamError('email')))
        )
      }
      if (!password) {
        return new Promise(resolve =>
          resolve(badRequest(new MissingParamError('password')))
        )
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return new Promise(resolve =>
          resolve(badRequest(new InvalidParamError('email')))
        )
      }

      return new Promise(resolve => resolve(ok({})))
    } catch (error) {
      return serverError(error)
    }
  }
}
