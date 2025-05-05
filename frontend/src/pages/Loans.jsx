import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoanForm from '../components/LoanForm';
import LoanList from '../components/LoanList';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  const fetchLoans = async (status = '') => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/loans${status ? `?status=${status}` : ''}`,
        {
          headers: { 'x-auth-token': token },
        }
      );
      console.log('Fetched loans:', res.data);
      setLoans(res.data);
    } catch (err) {
      console.error('Error fetching loans:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchLoans(statusFilter);
  }, [statusFilter, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Manage Loans</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Filter by Status</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
      <LoanForm onLoanAdded={() => fetchLoans(statusFilter)} />
      <LoanList loans={loans} onLoanDeleted={() => fetchLoans(statusFilter)} />
    </div>
  );
};

export default Loans;