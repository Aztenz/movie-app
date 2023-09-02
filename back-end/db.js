const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movieDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
