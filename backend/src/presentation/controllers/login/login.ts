import { threadId } from 'worker_threads'
import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../../protocols/email-validator'

export class LoginController implements Controller {
  private readonly emailValidator
  private readonly authentication
  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
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

      await this.authentication.auth(email, password)

      return new Promise(resolve => resolve(ok({})))
    } catch (error) {
      return serverError(error)
    }
  }
}
