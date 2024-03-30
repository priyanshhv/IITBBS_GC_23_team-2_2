const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  menu: [
    {
      item: { type: String, required: true },
      price: { type: Number, required: true },
      // Additional fields for menu items
    }
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Additional fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);