const express = require('express');
const router = express.Router();
const User = require('../database/models/User');

// GET retrieve a user's favorite movies
router.get('/', async (req, res) => {
  const userId = req.params.user_id;
  try {
    // Retrieve and return a user's favorite movies
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const favoriteMovies = user.favoriteMovies;
    res.json(favoriteMovies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST add a movie to a user's favorites
router.post('/', async (req, res) => {
  const userId = req.params.user_id;
  const { movieId } = req.body;
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the movie is already in the user's favorites
    if (user.favoriteMovies.includes(movieId)) {
      return res.status(400).json({ error: 'Movie already in favorites' });
    }

    // Add the movie ID to the user's favoriteMovies array
    user.favoriteMovies.push(movieId);

    // Save the updated user document
    const updatedUser = await user.save();

    // Return the updated user with the added movie
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE remove a movie from a user's favorites
router.delete('/:movie_id', async (req, res) => {
  const userId = req.params.user_id;
  const movieId = req.params.movie_id;
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the movie is in the user's favorites
    if (!user.favoriteMovies.includes(movieId)) {
      return res.status(400).json({ error: 'Movie not in favorites' });
    }

    // Remove the movie ID from the user's favoriteMovies array
    user.favoriteMovies = user.favoriteMovies.filter((id) => id !== movieId);

    // Save the updated user document
    const updatedUser = await user.save();

    // Return the updated user without the removed movie
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
