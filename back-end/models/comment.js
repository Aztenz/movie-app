const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId, // Reference to the user who posted the comment
  movie_id: mongoose.Schema.Types.ObjectId, // Reference to the movie the comment is about
  text: String,
  timestamp: Date,
});


module.exports = mongoose.model('Comment', commentSchema);
