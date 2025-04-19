const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')

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
    error("URL can't be empty")
    return response.status(400).end()
  }
  if (!request.body.title) {
    error("title can't be empty")
    return response.status(400).end()}
  const blog = new Blog(request.body)

  console.log(blog)
  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => next(error))
})

module.exports = blogsRouter
