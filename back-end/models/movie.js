const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  reviews: [{ text: String, rating: Number }],
});

module.exports = mongoose.model('Movie', movieSchema);
