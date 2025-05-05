import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoanList = ({ loans, onLoanDeleted }) => {
  console.log('Loans in LoanList:', loans);

  const handleDelete = async (loanId) => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/loans/${loanId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        toast.success('Loan deleted successfully', {
          position: 'top-right',
          autoClose: 5000,
        });
        onLoanDeleted(); // Refresh loan list
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error('Error deleting loan', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Loans</h2>
      {loans.length === 0 ? (
        <p className="text-gray-600">No loans found for the selected filter.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Item</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Balance to be paid</th>
              <th className="border p-2">Due Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td className="border p-2">{loan.customer?.name || 'Unknown'}</td>
                <td className="border p-2">{loan.itemDescription}</td>
                <td className="border p-2">₹{loan.loanAmount}</td>
                <td className="border p-2">₹{loan.balance}</td>
                <td className="border p-2">{new Date(loan.dueDate).toLocaleDateString()}</td>
                <td className="border p-2">{loan.status}</td>
                <td className="border p-2 space-x-2">
                  <Link
                    to={`/repayments/${loan._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Repay
                  </Link>
                  <Link
                    to={`/loans/${loan._id}`}
                    className="text-yellow-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/loan/${loan._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    All Repayments
                  </Link>
                  <button
                    onClick={() => handleDelete(loan._id)}
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

export default LoanList;