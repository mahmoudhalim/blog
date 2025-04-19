const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs)
    })
    .catch((error) => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  if (!request.body.likes) request.body.likes = 0
  if (!request.body.url) {
    return response.status(400).send({ error: 'URL cannot be empty' }).end()
  }
  if (!request.body.title) {
    return response.status(400).send({ error: 'title cannot be empty' }).end()
  }
  const blog = new Blog(request.body)

  console.log(blog)
  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
