const mongoose = require('../database/db');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  profileImage: {
    type: String // This will store the filename of the profile image
  },
  createdAt: { type: Date, default: Date.now }
});


//login
userSchema.statics.login = async function( {email, password}) {
  const user = await this.findOne({ email });

  if (user) {
    if (user.password === password) {
      return user;
    } else {
      throw new Error('Incorrect password');
    }
  } else {
    throw new Error('User not found');
  }
};


module.exports = mongoose.model('User', userSchema, 'users');
