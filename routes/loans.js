const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Customer = require('../models/Customer');
const Loan = require('../models/Loan');


router.get('/', auth, async (req, res) => {
  try {
    const { status } = req.query; // status = 'pending', 'paid', 'overdue', or 'all'

    // Base query scoped to current user
    let query = { user: req.user.id };

    // Add status to query only if provided and not 'all'
    if (status && status !== 'all') {
      query.status = status;
    }

    let loans = await Loan.find(query).populate('customer');

    // Auto-tag overdue loans
    const today = new Date();
    const updatedLoans = await Promise.all(
      loans.map(async (loan) => {
        if (loan.status === 'pending' && today > new Date(loan.dueDate)) {
          loan.status = 'overdue';
          await loan.save();
        }
        return loan;
      })
    );

    res.json(updatedLoans);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add loan
router.post('/', auth, async (req, res) => {
  const { customerId, itemDescription, loanAmount, issueDate, dueDate, frequency, interestRate, graceDays } = req.body;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });
    if (customer.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    const loan = new Loan({
      user: req.user.id,
      customer: customerId,
      itemDescription,
      loanAmount,
      issueDate,
      dueDate,
      frequency,
      interestRate,
      graceDays,
      balance: loanAmount,
    });
    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update loan

router.put('/:id', auth, async (req, res) => {
  const {
    itemDescription,
    loanAmount,
    issueDate,
    dueDate,
    frequency,
    interestRate,
    graceDays,
    status // <-- Add this line
  } = req.body;

  try {
    let loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ msg: 'Loan not found' });
    if (loan.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    const updatedData = {
      itemDescription,
      loanAmount,
      issueDate,
      dueDate,
      frequency,
      interestRate,
      graceDays,
      balance: loanAmount, // Optional: maybe only reset balance when loanAmount changes
    };

    if (status) updatedData.status = status; // <-- Conditionally add status

    loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    res.json(loan);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete loan
router.delete('/:id', auth, async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ msg: 'Loan not found' });
    if (loan.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await loan.deleteOne();
    res.json({ msg: 'Loan deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;