const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/User');

// POST create a new user account
router.post('/users', async (req, res) => {
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user document
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user document to the database
    const savedUser = await newUser.save();

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: savedUser._id }, 'your-secret-key');

    // Return the user data and token
    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST authenticate a user and generate a token
router.post('/login', async (req, res) => {
  try {
    // Check if the user exists with the provided email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');

    // Return the user data and token
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET retrieve user profile information
router.get('/users/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
    // Retrieve the user profile based on the user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update user profile details
router.put('/users/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
    // Update the user profile based on the user ID
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
