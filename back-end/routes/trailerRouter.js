const express = require('express');
const router = express.Router();
const Movie = require('../database/models/Movie');

// GET trailers for a specific movie
router.get('/', async (req, res) => {
  const movieId = req.params.movie_id;
  try {
    // Find the movie by ID and retrieve its trailers
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Extract and return the trailers
    const trailers = movie.trailers;
    res.json(trailers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST add a new trailer for a movie
router.post('/', async (req, res) => {
  const movieId = req.params.movie_id;
  const { title, url, thumbnail_url } = req.body;
  try {
    // Find the movie by ID
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Create a new trailer object
    const newTrailer = {
      title,
      url,
      thumbnail_url,
    };

    // Add the trailer to the movie's trailers array
    movie.trailers.push(newTrailer);

    // Save the updated movie document
    const updatedMovie = await movie.save();

    // Return the newly added trailer
    res.status(201).json(updatedMovie.trailers[updatedMovie.trailers.length - 1]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update trailer details for a movie
router.put('/:trailer_id', async (req, res) => {
  const movieId = req.params.movie_id;
  const trailerId = req.params.trailer_id;
  const { title, url, thumbnail_url } = req.body;
  try {
    // Find the movie by ID
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Find the trailer within the movie's trailers array
    const trailerToUpdate = movie.trailers.id(trailerId);
    if (!trailerToUpdate) {
      return res.status(404).json({ error: 'Trailer not found' });
    }

    // Update the trailer details
    trailerToUpdate.title = title;
    trailerToUpdate.url = url;
    trailerToUpdate.thumbnail_url = thumbnail_url;

    // Save the updated movie document
    const updatedMovie = await movie.save();

    // Return the updated trailer
    res.json(trailerToUpdate);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a trailer for a movie
router.delete('/:trailer_id', async (req, res) => {
  const movieId = req.params.movie_id;
  const trailerId = req.params.trailer_id;
  try {
    // Find the movie by ID
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Find and remove the trailer from the movie's trailers array
    const trailerToDelete = movie.trailers.id(trailerId);
    if (!trailerToDelete) {
      return res.status(404).json({ error: 'Trailer not found' });
    }

    trailerToDelete.remove();

    // Save the updated movie document
    await movie.save();

    // Return a success message
    res.json({ message: 'Trailer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
