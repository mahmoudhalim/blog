const { beforeEach, test, after } = require('node:test')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const assert = require('node:assert')
const mongoose = require('mongoose')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogsObject = helper.initialBlogs.map((blog) => new Blog(blog))
  const promisesArray = blogsObject.map((blog) => blog.save())
  await Promise.all(promisesArray)
})

test('blogs are returned successfully', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})


after(async () => {
  await mongoose.connection.close()
})
