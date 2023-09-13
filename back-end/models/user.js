const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // Make sure to hash and salt passwords for security.
  // Add other user-related fields here (e.g., profile image, settings).
});


module.exports = mongoose.model('User', userSchema);
