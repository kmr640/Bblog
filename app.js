const express = require("express")
const app = express()
const port = 5555
const router = require("./routes/routes")
const cookieParser = require("cookie-parser")
const { userAuth, verifyUser } = require("./middleware/mainMiddleware.js")
const uploadMiddleware = require("./middleware/uploadMiddleware")
const bodyParser = require("body-parser")
const sendEmail = require("./middleware/nodeMailerMiddleware.js")
require("dotenv").config()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const Blog = require("./model/blogSchema")

app.use(uploadMiddleware)
app.use(cookieParser())
app.use(express.json())

app.set("views", "views")
app.set("view engine", "ejs")

app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/uploads"))

app.put("/blogs/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(updatedBlog)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

app.post("/sendemail", (req, res) => {
  console.log(req.body)
  sendEmail(req)
    .then(() => {
      res.send("Email sent successfully")
    })
    .catch((error) => {
      console.error("Error sending email:", error)
      res.status(500).send("Error sending email")
    })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
app.use(router)

// app.get('*', verifyUser)
app.get("/", (req, res) => res.render("index"))
app.get("/dashboard", userAuth, verifyUser, (req, res) =>
  res.render("dashboard")
)
