const express = require('express'),
  morgan = require('morgan');
const app = express();

app.use(morgan('common'));

let topmovies = [
  {
    title: 'Pride and Prejudice',
    year: '2005'
  },
  {
    title: 'The Departed',
    year: '2006'
  },
  {
    title: 'The Bourne Identity',
    year: '2002'
  },
  {
    title: 'The Bourne Supremacy',
    year: '2004'
  },
  {
    title: 'The Bourne Ultimatum',
    year: '2007'
  },
  {
    title: 'The Great Gatsby',
    year: '2013'
  },
  {
    title: 'The Post',
    year: '2017'
  },
  {
    title: 'Sully',
    year: '2016'
  },
  {
    title: 'The Da Vinci Code',
    year: '2006'
  },
  {
    title: 'Catch Me If You Can',
    year: '2002'
  }
];

app.get('/', (req, res) => {
  res.send('Welcome to movies api');
});

app.get('/movies', (req, res) => {
  res.json(topmovies);
});

app.listen(8080, () => console.log('Your app is listening on port 8080.'));

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
