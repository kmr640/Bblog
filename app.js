const express = require('express');
const app = express();
const port = 5555;
const router = require('./routes/routes');
const cookieParser = require('cookie-parser');
const { userAuth, verifyUser } = require('./middleware/mainMiddleware.js')
const uploadMiddleware = require('./middleware/uploadMiddleware');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(uploadMiddleware);
app.use(cookieParser());
app.use(express.json());

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
app.use(router)


app.get('*', verifyUser)
app.get('/', (req, res) => res.render('index'))
app.get('/dashboard', userAuth, verifyUser, (req,res) => res.render('dashboard'));


