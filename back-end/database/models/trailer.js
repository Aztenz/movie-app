const trailerSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnail_url: {
      type: String,
      required: true,
    },
  });
  
  // Embedded schema within the Movie schema  
  module.exports = trailerSchema;
  