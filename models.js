const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Description: String,
    Birth: Number
  },
  ImagePath: String,
  Featured: Boolean
});

let userSchema = mongoose.Schema(
  {
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
  },
  { versionKey: false }
);

let Movie = mongoose.model('Movie', movieSchema, 'Movies');
let User = mongoose.model('User', userSchema, 'Users');

module.exports.Movie = Movie;
module.exports.User = User;