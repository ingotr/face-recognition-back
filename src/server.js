const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const helmet = require('helmet');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const saltRounds = 10;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'smart-brain'
  }
});

app.get('/', (req, res) => {
  res.send(db.users);
});

app.post('/signin', (req,res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req,res) => {
  register.handleRegister(req, res, db, bcrypt, saltRounds);
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
})

