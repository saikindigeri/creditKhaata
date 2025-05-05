const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment');
const Customer = require('../models/Customer');

// API 1: Get total loaned amount
router.get('/total-loaned', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id });
    const totalLoaned = loans.reduce((sum, loan) => sum + loan.loanAmount, 0);
    res.json({ totalLoaned });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// API 2: Get total collected amount
router.get('/total-collected', auth, async (req, res) => {
  try {
    const repayments = await Repayment.find({ user: req.user.id });
    const totalCollected = repayments.reduce((sum, repayment) => sum + repayment.amount, 0);
    res.json({ totalCollected });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// API 3: Get overdue amount
router.get('/overdue-amount', auth, async (req, res) => {
  try {
    const today = new Date();
    const loans = await Loan.find({ user: req.user.id, status: 'overdue' });
    const overdueAmount = loans.reduce((sum, loan) => sum + loan.balance, 0);
    res.json({ overdueAmount });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// API 4: Get average repayment time
router.get('/avg-repayment-time', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id, status: 'paid' });

    if (loans.length === 0) return res.json({ avgRepaymentTime: 0 });

    const repaymentTimes = await Promise.all(loans.map(async (loan) => {
      const repayments = await Repayment.find({ loan: loan._id }).sort({ date: 1 });

      const lastRepayment = repayments[repayments.length - 1];
      if (!lastRepayment) return 0;

      const timeDiff = new Date(lastRepayment.date) - new Date(loan.issueDate);
      return timeDiff / (1000 * 60 * 60 * 24); // Convert ms to days
    }));

    const avgRepaymentTime = repaymentTimes.reduce((sum, time) => sum + time, 0) / repaymentTimes.length;

    res.json({ avgRepaymentTime: Math.round(avgRepaymentTime * 100) / 100 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// API 5: Get overdue loans with customer details
router.get('/overdue', auth, async (req, res) => {
  try {
    const today = new Date();
    const loans = await Loan.find({ user: req.user.id, status: 'overdue' }).populate('customer');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;