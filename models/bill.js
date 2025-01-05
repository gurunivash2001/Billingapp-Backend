const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  products: [{ name: String, price: Number, quantity: Number }],
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', billSchema);
