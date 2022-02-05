import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountColection = MongoHelper.getCollection('accounts')
    await accountColection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        first_name: 'Jonatas',
        last_name: 'Silva',
        username: 'jonatasSilva',
        email: 'jonatas@meil.com',
        password: 'jes123',
        passwordConfirmation: 'jes123'
      })
      .expect(200)
  })
})
