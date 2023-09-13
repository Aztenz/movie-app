const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: String,
  birthdate: Date,
  nationality: String,
  biography: String,
  image_url: String,
});


module.exports = mongoose.model('Actor', actorSchema);
