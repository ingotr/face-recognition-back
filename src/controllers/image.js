const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '1af38e65d20b44dbb4b6abf0cf4eed1c'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      'c0c0ac362b03416da06ab3fa36fb58e3',req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API', err))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries', err))
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}
