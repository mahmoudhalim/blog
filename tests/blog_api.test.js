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

test('unique id in named id not _id', async () => {
  const response = await api.get('/api/blogs')
  const content = response.body
  assert.strictEqual(
    content.every((blog) => 'id' in blog && !('_id' in blog)),
    true
  )
})

test('a blog can be added', async () => {
  const newBlog = {
    title: 'TEST',
    author: 'The Tester',
    url: 'Testing ...',
    likes: 69420,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const blogsAfter = response.body
  assert.strictEqual(blogsAfter.length, helper.initialBlogs.length + 1)
})

test('likes field will default to zero if missing', async () => {
  const newBlog = {
    title: 'testing with no likes',
    author: 'random tester',
    url: 'example.com',
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('try to submit Note with no title or URL', async () => {
  let newBlog = {
    author: 'random tester',
    url: 'example.com',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)

  newBlog = {
    title: 'testing with no likes',
    author: 'random tester',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('blog can be deleted', async () => {
  const newBlog = {
    title: 'testing with no likes',
    author: 'random tester',
    url: 'example.com',
  }
  const response = await api.post('/api/blogs').send(newBlog).expect(201)
  const deletedBlogId = response.body.id
  await api.delete(`/api/blogs/${deletedBlogId}`).expect(204)
  const blogs = (await api.get('/api/blogs').expect(200)).body
  assert.strictEqual(
    blogs.every((blog) => blog.id !== deletedBlogId),
    true
  )
})

test('a blog can be updated', async () => {
  const newBlog = {
    title: 'testing with no likes',
    author: 'random tester',
    url: 'example.com',
  }
  let response = await api.post('/api/blogs').send(newBlog).expect(201)
  const updatedBlogId = response.body.id
  const updatedBlog = {
    likes: 69420,
  }
  response = await api.put(`/api/blogs/${updatedBlogId}`).send(updatedBlog).expect(200)

  assert.strictEqual(response.body.likes, updatedBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})
