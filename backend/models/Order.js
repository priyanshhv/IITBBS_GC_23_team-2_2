const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      quantity: { type: Number, required: true },
      // Additional fields as needed
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'completed', 'canceled'], default: 'pending' },
  queueNumber: { type: Number }, // Real-time queue number
  // Additional fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);