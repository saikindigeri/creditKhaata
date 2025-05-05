import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    trustScore: 5,
    creditLimit: 10000,
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/customers/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      })
      .then((res) => setFormData(res.data))
      .catch(() => alert('Error fetching customer'));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/customers/${id}`,
        formData,
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      navigate('/customers');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Error updating customer');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Edit Customer</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
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
          Update Customer
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;