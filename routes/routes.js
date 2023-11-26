const express = require('express');
const router = express.Router();
const { userAuth, verifyUser  } = require('../middleware/mainMiddleware.js')
const { resetCookie, createBlog, cookieHandler } = require('../controller/mainController.js')
const uploadMiddleware = require('../middleware/uploadMiddleware');
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// Define specific routes first
router.post('/createBlog', createBlog, (req, res) => {
  const formData = req.body; // This will contain the POST data
  res.send('Received the following data: ' + JSON.stringify(formData));
});
router.post('/', cookieHandler)
router.get('/', (req, res) => {
 res.render('index.ejs');
});



router.get('/dashboard', userAuth, verifyUser, (req, res) => {
  const user = res.locals.user;
  const blogs = res.locals.blogs;
  res.render('dashboard', { user: user, blogs: blogs });
});



router.get('/404', (req, res) => {
  res.render('404.ejs');
});


router.get('/logout', resetCookie, (res, req) => res.redirect('/'))




// 404 redirect (place this at the end)
router.get('*', (req, res) => {
  res.redirect('/404');
});



// Handle POST request to upload a profile image
// router.post('/upload-profile-images', uploadMiddleware, async (req, res) => {
//   try {
//     // Assuming you have a user object available in req.user after authentication
//     const user = await User.findById(req.user.id);
//     user.profileImage = req.file.filename; // Save the filename of the uploaded image to the user's profileImage field
//     await user.save();
//     res.json({ imageUrl: `/uploads/profile-images/${req.file.filename}` }); // Respond with a JSON object containing the image URL
//   } catch (error) {
//     res.status(500).send('Error uploading profile image');
//   }
// });


// router.post('/upload-profile-images', uploadMiddleware, async (req, res) => {
//   const user = await User.findById
//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ error: 'User is not authenticated' });
//     }

//     // Assuming you have a user object available in req.user after authentication
//     (req.user.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     user.profileImage = req.file.filename; // Save the filename of the uploaded image to the user's profileImage field
//     await user.save();
//     res.json({ imageUrl: `uploads/profile-images/${req.file.filename}` }); // Respond with a JSON object containing the image URL
//   } catch (error) {
//     console.error('Error uploading profile image:', error);
//     res.status(500).json({ error: 'Error uploading profile image' });
//   }
// });



module.exports = router;