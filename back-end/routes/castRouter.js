const express = require('express');
const router = express.Router();
const Actor = require('../database/models/Actor');

// GET all actors
router.get('/', async (req, res) => {
  try {
    // Retrieve and return a list of actors
    const actors = await Actor.find();
    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET actor by ID
router.get('/:actor_id', async (req, res) => {
  const actorId = req.params.actor_id;
  try {
    // Retrieve and return details about a specific actor by ID
    const actor = await Actor.findById(actorId);
    if (!actor) {
      return res.status(404).json({ error: 'Actor not found' });
    }
    res.json(actor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
