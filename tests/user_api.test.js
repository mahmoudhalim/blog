const { beforeEach, test, after, describe } = require('node:test')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const api = supertest(app)

describe('try creating invalid users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('create user with short password', async () => {
    const user = {
      username: 'randomTester',
      name: 'Random Tester',
      password: '123',
    }
    await api.post('/api/users').send(user).expect(400)
  })

  test('create user with short username', async () => {
    const user = {
      username: 'ra',
      name: 'Random Tester',
      password: '123456',
    }
    await api.post('/api/users').send(user).expect(400)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
