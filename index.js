const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

app.use(bodyParser.json());

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to movies api');
});

app.get('/movies', (req, res) => {
  //res.json(topmovies);
  Movies.find()
    .then(movies => {
      res.status(201).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then(movie => {
      res.json(movie);
    })
    .catch(err => {
      console.error(err);
      res.ststus(500).send('Error: ' + err);
    });
});

app.get('/movies/genre/:Genre', (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Genre })
    .then(movie => {
      res.json(movie.Genre);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/movies/director/:Director', (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Director })
    .then(movie => {
      res.json(movie.Director);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.post('/users', (req, res) => {
  //console.log(req.body.Username);
  Users.findOne({ Username: req.body.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + ' already Exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(user => {
            res.status(201).json(user);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(400).send('Error: ' + err);
    });
});

app.listen(8080, () => console.log('Your app is listening on port 8080.'));

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
