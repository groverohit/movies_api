const express = require('express'),
  morgan = require('morgan');
const app = express();

app.use(morgan('common'));

let topmovies = [
  {
    title: 'Pride and Prejudice',
    year: '2005',
    description:
      'Elizabeth Bennet meets single, rich, and proud Mr. Darcy and they fall in love:)',
    genre: 'Romance',
    director: 'Joe Wright',
    imgUrl: 'https://www.imdb.com/title/tt0414387/mediaviewer/rm1343528192',
    featured: 'Y'
  },
  {
    title: 'The Departed',
    year: '2006',
    description:
      'An undercover cop and a mole fight it out in a gang in South Boston',
    genre: 'Thriller',
    director: 'Martin Scorsese',
    imgURl: 'imdb.com/title/tt0407887/mediaviewer/rm981113088',
    featured: 'Y'
  },
  {
    title: 'The Bourne Identity',
    year: '2002',
    description:
      'A man suffering from amnesia eludes assisns and tries to regain his memory',
    genre: 'Action',
    director: 'Doug Liman',
    imgURl: 'https://www.imdb.com/title/tt0258463/mediaviewer/rm3995080704',
    featured: 'Y'
  },
  {
    title: 'The Bourne Supremacy',
    year: '2004',
    description:
      'Jason Bourne resumes his former life as an assasin to absolve himself',
    genre: 'Action',
    director: 'Paul Greengrass',
    imgURl: 'imdb.com/title/tt0372183/mediaviewer/rm519504384',
    featured: 'Y'
  },
  {
    title: 'The Bourne Ultimatum',
    year: '2007',
    description:
      'Jason Bourne dodges a ruthless CIA official and tries to search for the origins of his life',
    genre: 'Action',
    director: 'Paul Greengrass',
    imgUrl: 'https://www.imdb.com/title/tt0440963/mediaviewer/rm569248000',
    featured: 'Y'
  },
  {
    title: 'The Great Gatsby',
    year: '2013',
    description: 'About the life and past of a millionaire, Jay Gatsby',
    genre: 'Drama',
    director: 'Baz Luhrmann',
    imgUrl: 'https://www.imdb.com/title/tt1343092/mediaviewer/rm2643435776',
    featured: 'Y'
  },
  {
    title: 'The Post',
    year: '2017',
    description: 'A battle between the press and the government in the US',
    genre: 'History',
    director: 'Steven Spielberg',
    imgURl: 'https://www.imdb.com/title/tt6294822/mediaviewer/rm268720128',
    featured: 'Y'
  },
  {
    title: 'Sully',
    year: '2016',
    description:
      'An American pilot saves the passengers and crew by landing his damaged plane in the Hudson',
    genre: 'Biography',
    director: 'Clint Eastwood',
    imgURl: 'https://www.imdb.com/title/tt3263904/mediaviewer/rm1603684352',
    featured: 'Y'
  },
  {
    title: 'The Da Vinci Code',
    year: '2006',
    description: 'A religious mystery based on a novel',
    genre: 'Thriller',
    director: 'Ron Howard',
    imgURl: 'https://www.imdb.com/title/tt0382625/mediaviewer/rm3939601664',
    featured: 'Y'
  },
  {
    title: 'Catch Me If You Can',
    year: '2002',
    description: 'An FBI agent chases a teenage bank check forgerer',
    genre: 'Crime',
    director: 'Steven Spielberg',
    imgUrl: 'https://www.imdb.com/title/tt0264464/mediaviewer/rm3911489536',
    featured: 'Y'
  }
];

app.get('/', (req, res) => {
  res.send('Welcome to movies api');
});

app.get('/movies', (req, res) => {
  res.json(topmovies);
});

app.get('/movies/:title', (req, res) => {
  res.json(
    topmovies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

app.get('/movies/genre/:genre', (req, res) => {
  res.send('Display data about movies by genre');
});

app.get('/movies/director/:director', (req, res) => {
  res.send('Display data about movies by director');
});

app.post('/users', (req, res) => {
  res.send('Register User');
});

app.put('/users/update/:username', (req, res) => {
  res.send('Update User details');
});

app.put('/users/addfav/:username/:title', (req, res) => {
  res.send('Add title as favorite');
});

app.put('/users/remfav/:username/:title', (req, res) => {
  res.send('Remove title as favorite');
});

app.delete('/users/:username', (req, res) => {
  res.send('Deregister user');
});

app.listen(8080, () => console.log('Your app is listening on port 8080.'));

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
