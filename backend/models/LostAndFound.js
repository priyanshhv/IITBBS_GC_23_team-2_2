const mongoose = require('mongoose');

const lostAndFoundSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, enum: ['lost', 'found'] },
  item: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  // Additional fields as needed
}, { timestamps: true });

module.exports = mongoose.model('LostAndFound', lostAndFoundSchema);