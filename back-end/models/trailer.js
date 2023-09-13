// This schema is embedded within the Movie schema, so there's no separate model for trailers.

const trailerSchema = new mongoose.Schema({
    title: String,
    url: String,
    thumbnail_url: String,
});

// Embedded schema within the Movie schema
module.exports = trailerSchema;
