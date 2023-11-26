const mongoose = require('../database/db');
const User = require('../model/userSchema');

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      
    },
    content: {
      type: Object,
      
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
    }
  });

  blogSchema.post('save', function(doc, next) {
    if (!doc.userid) {
      console.log('401 Gebruiker niet geauthenticeerd');
    } else if (doc.errors) {
      console.log('500 Fout bij het opslaan van de blog');
      console.error(doc.errors);
    } else {
      console.log('200 Nieuwe blog succesvol aangemaakt');
    }
    next();
  });
  

  module.exports = mongoose.model('Blog', blogSchema, 'blogs');

