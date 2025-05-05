import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const RepaymentForm = ({ loanId, onRepaymentAdded }) => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/repayments`,
        { loanId, amount: Number(amount) },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      onRepaymentAdded();
      setAmount('');
      toast.success('Repayment recorded successfully', {
        position: 'top-right',
        autoClose: 5000,
      });
      navigate('/loans');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error('Error recording repayment', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label className="block text-gray-700">Repayment Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Record Repayment
      </button>
    </form>
  );
};

export default RepaymentForm;