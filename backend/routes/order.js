const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken');

// Place a new order
router.post('/', verifyToken, async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body
    });

    // Calculate queue number based on the number of pending orders
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    newOrder.queueNumber = pendingOrders + 1;

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update order status (restaurant owner only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    // Update queue numbers for other pending orders
    if (updatedOrder.status === 'accepted') {
      await Order.updateMany(
        { status: 'pending', queueNumber: { $gt: updatedOrder.queueNumber } },
        { $inc: { queueNumber: -1 } }
      );
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get order information
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user's orders
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get restaurant's orders (restaurant owner only)
router.get('/restaurant/:restaurantId', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ restaurant: req.params.restaurantId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;