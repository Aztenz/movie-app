const mongoose = require('mongoose');
const movieModel = require('./models/movie')


mongoose.connect('mongodb://0.0.0.0:27017/movieDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Mongoose connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

async function dbtest() {
  const movie = await movieModel.create({
    title: "movie2",
    genre: "genre3",
    reviews: [{
      text: "rev1",
      rating: 3.5
      }, {
      text: "rev2",
      rating: 4
      }],
  });
  movie.title = "notmovie2";
  await movie.save();
  console.log(movie);
}

dbtest()