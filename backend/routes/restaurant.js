const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken');

// Create a new restaurant (owner only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newRestaurant = new Restaurant({
      ...req.body,
      owner: req.body.owner,
    });

    const restaurant = await newRestaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update restaurant information (owner only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get restaurant information
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;