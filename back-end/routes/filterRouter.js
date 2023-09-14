const express = require('express');
const router = express.Router();
const Movie = require('../database/models/Movie');


// GET search for movies with multiple filters
router.get('/', async (req, res) => {
  const { title, genre, releaseYear, minRating } = req.query;
  try {
    let query = {};

    // Add title, genre, releaseYear, and minRating conditions to the query if provided
    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    }
    if (genre) {
      query.genres = genre; // Exact match for genre
    }
    if (releaseYear) {
      query.release_date = { $gte: new Date(`${releaseYear}-01-01`), $lte: new Date(`${releaseYear}-12-31`) };
    }
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // Retrieve and return movies based on the query
    const movies = await Movie.find(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
