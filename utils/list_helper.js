const _ = require('lodash')

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((most, blog) => (blog.likes > most.likes ? blog : most))
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, (blog) => blog.author)
  const topAuthor = _.maxBy(Object.entries(authors), ([, blogs]) => blogs)
  return {
    author: topAuthor[0],
    blogs: topAuthor[1],
  }
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, (blog) => blog.author)
  const authorsLikes = _.map(blogsByAuthor, (blogs, author) => {
    return {
      author,
      likes: _.sumBy(blogs, (blog) => blog.likes),
    }
  })
  return _.maxBy(authorsLikes, (item) => item.likes)
}


module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
