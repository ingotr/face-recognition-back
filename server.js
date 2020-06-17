const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('this is working');
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})

/*
/ -- > res
/signin --> POST = success
/register --> POST = user
/profile/:userId --> GET
/image --> PUT --> user
*/
