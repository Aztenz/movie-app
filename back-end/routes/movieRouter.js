const express = require('express');
const router = express.Router();
const Movie = require('../database/models/Movie');

// GET all movies
router.get('/', async (req, res) => {
  try {
    // Retrieve and return a list of movies with basic information
    const movies = await Movie.find({}, 'title release_date');
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET movie by ID
router.get('/:movie_id', async (req, res) => {
  const movieId = req.params.movie_id;
  try {
    // Retrieve and return detailed information about a specific movie by ID
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create a new movie
router.post('/', async (req, res) => {
  try {
    // Create a new movie entry in the database
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ error: 'Could not create a new movie' });
  }
});

// PUT update movie details by ID
router.put('/:movie_id', async (req, res) => {
  const movieId = req.params.movie_id;
  try {
    // Update movie details for a specific movie by ID
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a movie by ID
router.delete('/:movie_id', async (req, res) => {
  const movieId = req.params.movie_id;
  try {
    // Delete a movie from the database by ID
    const deletedMovie = await Movie.findByIdAndRemove(movieId);
    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(deletedMovie);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
