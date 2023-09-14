const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: 'Release date cannot be in the future',
    },
  },
  plot_summary: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  runtime: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: 'Runtime must be a positive number',
    },
  },
  poster_url: {
    type: String,
    required: true,
  },
  cast: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
    required: false,
  }],
  // Embedded trailers within the movie document
  trailers: [
    {
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      thumbnail_url: {
        type: String,
        required: true,
      },
    },
  ],
  // Custom movie_id for unique identification
  movie_id: {
    type: Number,
    unique: true,
    required: true,
  },
});


module.exports = mongoose.model('Movie', movieSchema);
