const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  trustScore: { type: Number, min: 0, max: 10, default: 5 },
  creditLimit: { type: Number, default: 10000 },
});

module.exports = mongoose.model('Customer', CustomerSchema);