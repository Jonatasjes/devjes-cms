import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        first_name: 'Jonatas',
        last_name: 'Silva',
        username: 'jonatasSilva',
        email: 'jonatas@meil.com',
        password: 'jes123',
        passwordConfirmatio: 'jes123'
      })
      .expect(200)
  })
})
