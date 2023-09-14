const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: 'Birthdate cannot be in the future',
    },
  },
  nationality: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true, // Set as optional
  }],  

});


module.exports = mongoose.model('Actor', actorSchema);
