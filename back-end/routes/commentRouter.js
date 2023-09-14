const express = require('express');
const router = express.Router();
const Movie = require('../database/models/Movie');

// GET comments for a specific movie
router.get('/', async (req, res) => {
  const movieId = req.params.movie_id;
  try {
    // Retrieve and return comments for a specific movie
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    const comments = movie.comments;
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST add a new comment for a movie
router.post('/', async (req, res) => {
  const movieId = req.params.movie_id;
  const { userId, text } = req.body;
  try {
    // Find the movie by ID
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Create a new comment object
    const newComment = {
      userId,
      text,
    };

    // Add the comment to the movie's comments array
    movie.comments.push(newComment);

    // Save the updated movie document
    const updatedMovie = await movie.save();

    // Return the newly added comment
    res.status(201).json(updatedMovie.comments[updatedMovie.comments.length - 1]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update a user's comment for a movie
router.put('/:comment_id', async (req, res) => {
  const movieId = req.params.movie_id;
  const commentId = req.params.comment_id;
  const { text } = req.body;
  try {
    // Find the movie by ID
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Find the comment within the movie's comments array
    const commentToUpdate = movie.comments.id(commentId);
    if (!commentToUpdate) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Update the comment text
    commentToUpdate.text = text;

    // Save the updated movie document
    const updatedMovie = await movie.save();

    // Return the updated comment
    res.json(commentToUpdate);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a user's comment for a movie
router.delete('/:comment_id', async (req, res) => {
  const movieId = req.params.movie_id;
  const commentId = req.params.comment_id;
  try {
    // Find the movie by ID
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Find and remove the comment from the movie's comments array
    const commentToDelete = movie.comments.id(commentId);
    if (!commentToDelete) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    commentToDelete.remove();

    // Save the updated movie document
    await movie.save();

    // Return a success message
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
