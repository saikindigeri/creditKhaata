const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment');

// Get all repayments for a loan
router.get('/loan/:loanId', auth, async (req, res) => {
  try {
    const repayments = await Repayment.find({ loan: req.params.loanId, user: req.user.id });
    res.json(repayments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add repayment
router.post('/', auth, async (req, res) => {
  const { loanId, amount, date } = req.body; // Getting date from request body
  try {
    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ msg: 'Loan not found' });
    if (loan.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    // Create repayment record with the date
    const repayment = new Repayment({
      user: req.user.id,
      loan: loanId,
      amount,
      date: date || new Date(), 
    });
    await repayment.save();

    // Update loan balance
    loan.balance -= amount;
    if (loan.balance <= 0) {
      loan.status = 'paid';
      loan.balance = 0;
    }
    await loan.save();

    res.status(201).json(repayment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;