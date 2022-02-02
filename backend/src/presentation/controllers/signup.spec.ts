import { SignupController } from './signup'

describe('Signup Controller', () => {
  test('Should return 400 if on first name is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        last_name: 'any_last_name',
        username: 'any_username',
        email: 'any_email',
        password: 'any_password',
        password_confirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: first_name'))
  })

  test('Should return 400 if on last name is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        first_name: 'any_first_name',
        username: 'any_username',
        email: 'any_email',
        password: 'any_password',
        password_confirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: last_name'))
  })

  test('Should return 400 if on username is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        first_name: 'any_first_name',
        last_name: 'any_last_name',
        email: 'any_email',
        password: 'any_password',
        password_confirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: username'))
  })
})
