const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  itemDescription: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  issueDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  frequency: { type: String, enum: ['bi-weekly', 'monthly'], required: true },
  interestRate: { type: Number, default: 0 },
  graceDays: { type: Number, default: 0 },
  balance: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
});

module.exports = mongoose.model('Loan', LoanSchema);