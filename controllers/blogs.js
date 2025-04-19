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
