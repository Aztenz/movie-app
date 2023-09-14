const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure unique usernames
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique email addresses
  },
  password: {
    type: String,
    required: true,
  },
  // Add other user-related fields here (e.g., profile image URL, settings, etc.)
});


module.exports = mongoose.model('User', userSchema);
