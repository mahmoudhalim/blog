const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

const PASSWORD_MIN = 4

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password || password.length < PASSWORD_MIN) {
    const e = new Error(
      `Password Validation failed: password ('${password}') is shorter than the minimum allowed length (${PASSWORD_MIN})`
    )
    e.name = 'ValidationError'
    throw e
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = userRouter
