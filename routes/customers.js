const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Customer = require('../models/Customer');

// Get all customers
router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user.id });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add customer
router.post('/', auth, async (req, res) => {
  const { name, phone, address, trustScore, creditLimit } = req.body;
  try {
    const customer = new Customer({ user: req.user.id, name, phone, address, trustScore, creditLimit });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update customer
router.put('/:id', auth, async (req, res) => {
  const { name, phone, address, trustScore, creditLimit } = req.body;
  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });
    if (customer.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: { name, phone, address, trustScore, creditLimit } },
      { new: true }
    );
    res.json(customer);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete customer
router.delete('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });
    if (customer.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await customer.deleteOne();
    res.json({ msg: 'Customer deleted' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;