const mongoose = require("../database/db")
const User = require("../model/userSchema")

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  blogId: {
    type: String,
  },
})

blogSchema.post("save", function (doc, next) {
  if (!doc.userId) {
    console.log("401 Gebruiker niet geauthenticeerd")
  } else if (doc.errors) {
    console.log("500 Fout bij het opslaan van de blog")
    console.error(doc.errors)
  } else {
    console.log("200 Nieuwe blog succesvol aangemaakt")
  }
  next()
})

module.exports = mongoose.model("Blog", blogSchema, "blogs")
