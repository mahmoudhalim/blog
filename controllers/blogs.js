const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.likes) request.body.likes = 0
  if (!request.body.url) {
    return response.status(400).send({ error: 'URL cannot be empty' }).end()
  }
  if (!request.body.title) {
    return response.status(400).send({ error: 'title cannot be empty' }).end()
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    user: user.id,
    ...request.body
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }
  if (title) blog.title = title
  if (url) blog.url = url
  if (author) blog.author = author
  if (likes) blog.likes = likes
  const updatedPost = await blog.save()
  response.json(updatedPost)
})

module.exports = blogsRouter
