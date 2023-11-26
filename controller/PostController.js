const Post = require('../model/userSchema');

exports.index = async (req, res) => {
  try {
    const users = await User.find();
    res.render('index', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
