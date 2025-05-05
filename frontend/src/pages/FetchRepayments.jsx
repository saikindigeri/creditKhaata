import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Repayments = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const [repayments, setRepayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRepayments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to view repayments', {
        position: 'top-right',
        autoClose: 5000,
      });
      navigate('/login');
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/repayments/loan/${loanId}`,
        {
          headers: { 'x-auth-token': token },
        }
      );
      console.log('Fetched repayments:', res.data); // Debug: Log repayment data
      setRepayments(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching repayments:', err.response?.data || err.message);
      toast.error('Error fetching repayments', {
        position: 'top-right',
        autoClose: 5000,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepayments();
  }, [loanId, navigate]);

  return (
    <div className="container mx-auto p-4">
 
      <div className="mt-8">
        <h3 className="text-xl mb-4">Repayment History</h3>
        {loading ? (
          <p className="text-gray-600">Loading repayments...</p>
        ) : repayments.length === 0 ? (
          <p className="text-gray-600">No repayments found for this loan.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {repayments.map((repayment) => (
                <tr key={repayment._id}>
                  <td className="border p-2">₹{repayment.amount}</td>
                  <td className="border p-2">
                    {new Date(repayment.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Repayments;