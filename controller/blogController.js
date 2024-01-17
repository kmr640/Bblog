const Blog = (req, res) => {
    if (req.user && req.user._id) {
      const newBlog = new Blog({
        title: req.body.title,
        blog: req.body.blog,
        user: req.user._id
      });
     
  
      newBlog.save(function(err) {
        if (err) {
          res.status(500).send('Fout bij het opslaan van de blog');
        } else {
          res.status(200).send('Nieuwe blog succesvol aangemaakt');
        }
      });
    } else {
      res.status(401).send('Gebruiker niet geauthenticeerd');
    }
  };

  
  module.exports = { Blog };
  
