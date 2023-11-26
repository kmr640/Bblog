const User = require('../model/userSchema');
const Blog = require('../model/blogSchema')
// const jwt = require('jsonwebtoken');

// require('dotenv').config();
// const generateJWT = Math.floor(Math.random() * 100000).toString();
// const expireDate = 2 * 24 * 60 * 60;

// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: expireDate });
// };

// const createCookie = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//       const user = await User.create({ name, email, password });
//       const token = createToken(user._id);

      

//       res.cookie('jwt', token, { httpOnly: true, maxAge: expireDate * 750 });
//       res.status(201).json({ user: user._id });
//   } catch (err) {
//       console.error('Error creating cookie:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
  

// };
// const verifyCookieofUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//       const user = await User.login({ email, password });
//       const token = createToken(user._id);

      

//       res.cookie('jwt', token, { httpOnly: true, maxAge: expireDate * 750 });
//       res.status(201).json({ user: user._id });
//   } catch (err) {
//       console.error('Error creating cookie:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
  

// };

// module.exports.cookieHandler = (req, res, next) => {
//   if (req.body.formType === 'registerForm') {
//     createCookie(req, res, next);
//   } else if (req.body.formType === 'loginForm') {
//     verifyCookieofUser(req, res, next);
//   } else {
//     res.status(400).send('Invalid form data');
//   }
// };


// module.exports.resetCookie = (req, res) => {
//   res.cookie('jwt', '', { maxAge: 1});
//   res.redirect('/');
// }



const jwt = require('jsonwebtoken');

require('dotenv').config();
const expireDate = 2 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: expireDate });
};

const createCookie = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Stap 1: Maak de gebruiker aan
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);

    res.cookie('jwt', token, { httpOnly: true, maxAge: expireDate * 750 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.error('Error creating cookie:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const createCookie = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//       const user = await User.create({ name, email, password });
//       const token = createToken(user._id);

//       // Voorbeeld van het maken van een blog die aan de gebruiker is gekoppeld
//       const blog = await Blog.create({ title, blog, createdAt, user: user._id });

//       res.cookie('jwt', token, { httpOnly: true, maxAge: expireDate * 750 });
//       res.status(201).json({ user: user._id, blog: blog._id }); // Stuur ook het ID van de gemaakte blog terug
//   } catch (err) {
//       console.error('Error creating cookie:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const createBlog = async (req, res) => {
//   const { title, content, createdAt, userId } = req.body;

//   try {
//     // Create the blog and link it to the user
//     const blog = await Blog.create({ title, content, createdAt, userid: userId });

//     res.status(201).json({ blog: blog._id });
//   } catch (err) {
//     console.error('Error creating blog:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

async function createBlog(req, res) {
  const { title, content, createdAt, userId } = req.body;
  

  try {
    // Create the blog and link it to the user
    const blog = await Blog.create({ title, content, createdAt, userId });

    // Assuming the blog creation is successful, send a response
    res.status(201).json({ blogId: blog.id });
  } catch (err) {
    // If an error occurs during blog creation, handle the error
    console.error('Error creating blog:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



const verifyCookieofUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.login({ email, password });
      const token = createToken(user._id);

      // Voorbeeld van het ophalen van blogs die aan de gebruiker zijn gekoppeld
      const blogs = await Blog.find({ userid: user._id });

      res.cookie('jwt', token, { httpOnly: true, maxAge: expireDate * 750 });
      res.status(201).json({ user: user._id, blogs: blogs }); // Stuur ook de gevonden blogs terug
  } catch (err) {
      console.error('Error creating cookie:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const cookieHandler = (req, res, next) => {
  if (req.body.formType === 'registerForm') {
    createCookie(req, res, next);
  } else if (req.body.formType === 'loginForm') {
    verifyCookieofUser(req, res, next);
  } else {
    res.status(400).send('Invalid form data');
  }
};

module.exports = { createCookie, createBlog, verifyCookieofUser, cookieHandler };

module.exports.resetCookie = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1});
  res.redirect('/');
};
