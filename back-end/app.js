// app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const Movie = require('./models/movie');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define routes for your endpoints
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/movies/:genre', async (req, res) => {
  const genre = req.params.genre;
  try {
    const moviesByGenre = await Movie.find({ genre });
    res.json(moviesByGenre);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/movies/:movieId/reviews', async (req, res) => {
  const movieId = req.params.movieId;
  const { text, rating } = req.body;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    movie.reviews.push({ text, rating });
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
