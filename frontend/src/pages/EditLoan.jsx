import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '',
    itemDescription: '',
    loanAmount: '',
    issueDate: '',
    dueDate: '',
    frequency: 'monthly',
    interestRate: 0,
    graceDays: 0,
  });

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/loans/${id}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        const loan = res.data;
        setFormData({
          customerId: loan.customer._id,
          itemDescription: loan.itemDescription,
          loanAmount: loan.loanAmount,
          issueDate: new Date(loan.issueDate).toISOString().split('T')[0],
          dueDate: new Date(loan.dueDate).toISOString().split('T')[0],
          frequency: loan.frequency,
          interestRate: loan.interestRate,
          graceDays: loan.graceDays,
        });
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error('Error fetching loan', { position: 'top-right', autoClose: 5000 });
      }
    };

    const fetchCustomers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/customers`, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setCustomers(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error('Error fetching customers', { position: 'top-right', autoClose: 5000 });
      }
    };

    fetchLoan();
    fetchCustomers();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/loans/${id}`,
        formData,
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      toast.success('Loan updated successfully', { position: 'top-right', autoClose: 5000 });
      navigate('/loans');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error('Error updating loan', { position: 'top-right', autoClose: 5000 });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Edit Loan</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
        <div className="mb-4">
          <label className="block text-gray-700">Customer</label>
          <select
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Item Description</label>
          <input
            type="text"
            value={formData.itemDescription}
            onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Loan Amount</label>
          <input
            type="number"
            value={formData.loanAmount}
            onChange={(e) => setFormData({ ...formData, loanAmount: Number(e.target.value) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Issue Date</label>
          <input
            type="date"
            value={formData.issueDate}
            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Frequency</label>
          <select
            value={formData.frequency}
            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Interest Rate (%)</label>
          <input
            type="number"
            value={formData.interestRate}
            onChange={(e) => setFormData({ ...formData, interestRate: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Grace Days</label>
          <input
            type="number"
            value={formData.graceDays}
            onChange={(e) => setFormData({ ...formData, graceDays: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Update Loan
        </button>
      </form>
    </div>
  );
};

export default EditLoan;