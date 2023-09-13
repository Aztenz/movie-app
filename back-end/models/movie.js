const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  release_date: Date,
  plot_summary: String,
  genres: [String],
  runtime: Number,
  directors: [String],
  writers: [String],
  poster_url: String,
  frames_url: [string],
  trailers: [{
    title: String,
    url: String,
    thumbnail_url: String,
  }],
});


module.exports = mongoose.model('Movie', movieSchema);
