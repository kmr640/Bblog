const multer  = require('multer');
const path = require('path');


// Set up storage for uploaded profile images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve( 'uploads/profile-images') ); // Save the uploaded images in the 'public/uploads/profile-images' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Generate a unique filename for the uploaded image
  }
});

const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
    }
  };

  const uploadMiddleware = multer({ 
    storage: storage, 
    fileFilter: fileFilter 
  }).single('profileImage');

module.exports = uploadMiddleware
