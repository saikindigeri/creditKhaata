import { Link } from 'react-router-dom';
import axios from 'axios';

const CustomerList = ({ customers, onCustomerDeleted }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/customers/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      onCustomerDeleted();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Error deleting customer');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Customers</h2>
      {customers.length === 0 ? (
        <p className="text-gray-600">No customers found.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Trust Score</th>
              <th className="border p-2">Credit Limit</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td className="border p-2">{customer.name}</td>
                <td className="border p-2">{customer.phone || '-'}</td>
                <td className="border p-2">{customer.trustScore}</td>
                <td className="border p-2">₹{customer.creditLimit}</td>
                <td className="border p-2">
                  <Link to={`/customers/${customer._id}`} className="text-blue-500 hover:underline mr-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(customer._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerList;