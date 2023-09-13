const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId, // Reference to the user who added the movie to their favorites
  movie_id: mongoose.Schema.Types.ObjectId, // Reference to the favorite movie
});


module.exports = mongoose.model('Favorite', favoriteSchema);
