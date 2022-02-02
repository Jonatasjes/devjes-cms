import { MissingParameterError } from '../errors/missing-param-error'
import { SignupController } from './signup'

describe('Signup Controller', () => {
  test('Should return 400 if on first name is provided', () => {
    const sut = new SignupController()
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
    expect(httpResponse.body).toEqual(new MissingParameterError('first_name'))
  })

  test('Should return 400 if on last name is provided', () => {
    const sut = new SignupController()
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
    expect(httpResponse.body).toEqual(new MissingParameterError('last_name'))
  })

  test('Should return 400 if on username is provided', () => {
    const sut = new SignupController()
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
    expect(httpResponse.body).toEqual(new MissingParameterError('username'))
  })

  test('Should return 400 if on email is provided', () => {
    const sut = new SignupController()
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
    expect(httpResponse.body).toEqual(new MissingParameterError('email'))
  })

  test('Should return 400 if on password is provided', () => {
    const sut = new SignupController()
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
    expect(httpResponse.body).toEqual(new MissingParameterError('password'))
  })

  test('Should return 400 if on password confirmation is provided', () => {
    const sut = new SignupController()
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
      new MissingParameterError('passwordConfirmation')
    )
  })
})
