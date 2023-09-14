const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const path = require('path');
const Movie = require('../database/models/Movie');

// Define storage for uploaded posters
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/posters'); // Save posters in the 'public/posters' directory
  },
  filename: function (req, file, cb) {
    // Use a unique filename for the uploaded poster
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create a multer instance with the defined storage
const upload = multer({ storage });

// POST upload a movie poster
router.post('/upload/poster', upload.single('poster'), async (req, res) => {
  try {
    // Get the uploaded file path
    const posterPath = req.file.path;

    // Save the poster path to the movie document (assuming you have a movie ID)
    const movieId = req.body.movieId; // You need to send the movie ID along with the request
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    movie.poster_url = posterPath; // Update the poster URL in the movie document
    await movie.save();

    res.json({ message: 'Poster uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET serve a movie poster
router.get('/posters/:poster_filename', (req, res) => {
  const posterFilename = req.params.poster_filename;
  const posterPath = `public/posters/${posterFilename}`; // Define the path to your posters directory

  // Serve the poster as a static file
  res.sendFile(posterPath);
});

module.exports = router;
