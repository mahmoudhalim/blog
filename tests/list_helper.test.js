const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const { initialBlogs } = require('./test_helper')


describe('most liked post', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]

  test('when list has only one blog', () => {
    assert.deepStrictEqual(
      listHelper.favoriteBlog(listWithOneBlog),
      listWithOneBlog[0]
    )
  })

  test('empty list'),
    () => assert.strictEqual(listHelper.favoriteBlog([]), null)

  test('list with multiple blogs', () => {
    const favorite = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    }
    assert.deepStrictEqual(listHelper.favoriteBlog(initialBlogs), favorite)
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('empty list'), () => assert.strictEqual(listHelper.totalLikes([]), 0)

  test('list with multiple blogs', () =>
    assert.strictEqual(listHelper.totalLikes(initialBlogs), 36))
})

describe('most blogs', () => {
  test('empty list'), () => assert.strictEqual(listHelper.mostBlogs([]), null)

  test('list with multiple blogs', () => {
    const topAuthor = {
      author: 'Robert C. Martin',
      blogs: 3,
    }
    assert.deepStrictEqual(listHelper.mostBlogs(initialBlogs), topAuthor)
    
  })
})

describe('most likes', () => {
  test('empty list'), () => assert.strictEqual(listHelper.mostLikes([]), null)

  test('list with multiple blogs', () => {
    const topAuthor = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }
    assert.deepStrictEqual(listHelper.mostLikes(initialBlogs), topAuthor)
  })
})

