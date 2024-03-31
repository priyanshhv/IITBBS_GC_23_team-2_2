const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/verifyToken');

// Add a new book (library staff only)
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const book = await newBook.save();
    res.status(201).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update book information (library staff only)
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Borrow a book
router.post('/:id/borrow',verifyTokenAndAdmin, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { availableCount: -1 },
        $push: {
          borrowedBy: {
            user: req.body.userId,
            borrowedAt: Date.now(),
            returnDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          },
        },
      },
      { new: true }
    );
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Return a book
router.post('/:id/return', verifyTokenAndAdmin, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { availableCount: 1 },
        $pull: {
          borrowedBy: {
            user: req.body.userId,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get book information
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user's borrowed books
router.get('/borrowed/:userId', verifyToken, async (req, res) => {
  try {
    const books = await Book.find({ 'borrowedBy.user': req.params.userId });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;