const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/movie_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import and use middlewares
const loggerMiddleware = require('./middleware/logger');

app.use(loggerMiddleware);

// Import and use the routes
const castRouter = require('./routes/castRouter');
const userCommentsRouter = require('./routes/commentRouter');
const userFavoritesRouter = require('./routes/favouriteRouter');
const filterRouter = require('./routes/filterRouter');
const imageRouter = require('./routes/imageRouter');
const movieRouter = require('./routes/movieRouter');
const trailerRouter = require('./routes/trailerRouter');
const userRouter = require('./routes/userRouter');

app.use("/api/actors", castRouter);
app.use("/api/movies/:movie_id/comments", userCommentsRouter);
app.use("/api/users/:user_id/favorites", userFavoritesRouter);
app.use("/api/search/movies", filterRouter);
app.use("/api", imageRouter);
app.use("/api/movies", movieRouter);
app.use("/api/movies/:movie_id/trailers", trailerRouter);
app.use("/api", userRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
