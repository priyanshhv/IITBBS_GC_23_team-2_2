const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  availableCount: { type: Number, required: true },
  borrowedBy: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      borrowedAt: { type: Date, required: true },
      returnDue: { type: Date, required: true }
    }
  ],
  // Additional fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);