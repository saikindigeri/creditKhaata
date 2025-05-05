import { useParams } from 'react-router-dom';
import RepaymentForm from '../components/RepaymentForm';


const Repayments = () => {
  const { loanId } = useParams();

  const refreshLoans = async () => {
    // Could navigate back to Loans page or refresh parent component
    // For simplicity, we'll rely on manual navigation
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Record Repayment</h1>
      <RepaymentForm loanId={loanId} onRepaymentAdded={refreshLoans} />
    </div>
  );
};

export default Repayments;