import { useState } from 'react';
import axios from 'axios';

const CustomerForm = ({ onCustomerAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    trustScore: 5,
    creditLimit: 10000,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/customers`,
        formData,
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      onCustomerAdded();
      setFormData({ name: '', phone: '', address: '', trustScore: 5, creditLimit: 10000 });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Error adding customer');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone</label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Trust Score (0-10)</label>
        <input
          type="number"
          value={formData.trustScore}
          onChange={(e) => setFormData({ ...formData, trustScore: Number(e.target.value) })}
          className="w-full p-2 border rounded"
          min="0"
          max="10"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Credit Limit</label>
        <input
          type="number"
          value={formData.creditLimit}
          onChange={(e) => setFormData({ ...formData, creditLimit: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Add Customer
      </button>
    </form>
  );
};

export default CustomerForm;