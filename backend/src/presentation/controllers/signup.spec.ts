import { SignupController } from './signup'

describe('Signup Controller', () => {
  test('Should return 400 if on first name is provided', () => {
    const sut = new SignupController()
    const httpRequest = {
      body: {
        last_name: 'any_last_name',
        password: 'any_password',
        password_confirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })
})
