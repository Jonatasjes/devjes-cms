import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { ServerError } from '../errors/server-error'
import { EmailValidator } from '../protocols/email-validator'
import { SignUpController } from './signup'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Signup Controller', () => {
  test('Should return 400 if on first name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        last_name: 'any_last_name',
        username: 'any_username',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('first_name'))
  })

  test('Should return 400 if on last name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        first_name: 'any_first_name',
        username: 'any_username',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('last_name'))
  })

  test('Should return 400 if on username is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        first_name: 'any_first_name',
        last_name: 'any_last_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('username'))
  })

  test('Should return 400 if on email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        first_name: 'any_first_name',
        last_name: 'any_last_name',
        username: 'any_username',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if on password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        first_name: 'any_first_name',
        last_name: 'any_last_name',
        username: 'any_username',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if on password confirmation is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        first_name: 'any_first_name',
        last_name: 'any_last_name',
        username: 'any_username',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation')
    )
  })

  test('Should return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        first_name: 'any_first_name',
        last_name: 'any_last_name',
        username: 'any_username',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest
      .spyOn(emailValidatorStub, 'isValid')
      .mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        first_name: 'any_first_name',
        last_name: 'any_last_name',
        username: 'any_username',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 500 if EmailValidator throws', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid(email: string): boolean {
        throw new Error()
      }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub)

    const httpRequest = {
      body: {
        first_name: 'any_first_name',
        last_name: 'any_last_name',
        username: 'any_username',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
