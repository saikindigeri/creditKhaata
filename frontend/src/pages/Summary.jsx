import { useState, useEffect } from 'react';
import axios from 'axios';
import Summary from '../components/Summary';

const SummaryPage = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [totalLoaned, totalCollected, overdueAmount, avgRepaymentTime, overdueLoans] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/summary/total-loaned`, {
            headers: { 'x-auth-token': localStorage.getItem('token') },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/summary/total-collected`, {
            headers: { 'x-auth-token': localStorage.getItem('token') },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/summary/overdue-amount`, {
            headers: { 'x-auth-token': localStorage.getItem('token') },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/summary/avg-repayment-time`, {
            headers: { 'x-auth-token': localStorage.getItem('token') },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/summary/overdue`, {
            headers: { 'x-auth-token': localStorage.getItem('token') },
          }),
        ]);
        setSummary({
          totalLoaned: totalLoaned.data.totalLoaned,
          totalCollected: totalCollected.data.totalCollected,
          overdueAmount: overdueAmount.data.overdueAmount,
          avgRepaymentTime: avgRepaymentTime.data.avgRepaymentTime,
          overdueLoans: overdueLoans.data,
        });
      } catch (err) {
        console.error('Error fetching summary:', err);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Summary summary={summary} />
    </div>
  );
};

export default SummaryPage;