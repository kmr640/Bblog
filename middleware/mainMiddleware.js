const jwt = require("jsonwebtoken")
const User = require("../model/userSchema.js")
const Blog = require("../model/blogSchema.js")
require("dotenv").config()

module.exports.userAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.error(err)
        res.redirect("/")
      } else {
        console.log(decodedToken)
        next()
      }
    })
  } else {
    res.redirect("/")
  }
}

module.exports.verifyUser = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(decodedToken)
        res.locals.user = null
        res.locals.blogs = null
        res.status(401).send("Unauthorized by verifyUser function")
      } else {
        try {
          const user = await User.findById(decodedToken.id)
          const blogs = await Blog.find({ userId: decodedToken.id })
          console.log("User:", user)
          console.log("Blogs:", blogs)
          res.locals.user = user
          res.locals.blogs = blogs
          next()
        } catch (error) {
          console.error("Error fetching user and blogs:", error)
          res.status(500).send("Internal Server Error")
        }
      }
    })
  } else {
    next()
  }
}
