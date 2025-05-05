import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/customers`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Manage Customers</h1>
      <CustomerForm onCustomerAdded={fetchCustomers} />
      <CustomerList customers={customers} onCustomerDeleted={fetchCustomers} />
    </div>
  );
};

export default Customers;