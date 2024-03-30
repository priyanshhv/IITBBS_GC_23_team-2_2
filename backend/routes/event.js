const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { verifyTokenAndAdmin,verifyToken } = require('../middleware/verifyToken');

// Create a new event (admin only)
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const newEvent = new Event({
      ...req.body,
      postedBy: req.user._id,
    });

    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update event information (admin only)
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add comment to an event
router.post('/:id/comments', verifyToken, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            user: req.user._id,
            comment: req.body.comment,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get event information
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;