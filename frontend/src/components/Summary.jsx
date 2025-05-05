const Summary = ({ summary }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Loan Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow-md rounded">
          <h3 className="text-lg font-semibold">Total Loaned</h3>
          <p>₹{summary.totalLoaned || 0}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded">
          <h3 className="text-lg font-semibold">Total Collected</h3>
          <p>₹{summary.totalCollected || 0}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded">
          <h3 className="text-lg font-semibold">Overdue Amount</h3>
          <p>₹{summary.overdueAmount || 0}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded">
          <h3 className="text-lg font-semibold">Avg Repayment Time (days)</h3>
          <p>{(summary.avgRepaymentTime || 0).toFixed(2)}</p>
        </div>
      </div>
      <h3 className="text-xl mt-6 mb-2">Overdue Loans</h3>
      {summary.overdueLoans?.length === 0 ? (
        <p className="text-gray-600">No overdue loans.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Item</th>
              <th className="border p-2">Balance</th>
              <th className="border p-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {(summary.overdueLoans || []).map((loan) => (
              <tr key={loan._id}>
                <td className="border p-2">{loan.customer.name}</td>
                <td className="border p-2">{loan.itemDescription}</td>
                <td className="border p-2">₹{loan.balance}</td>
                <td className="border p-2">{new Date(loan.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Summary;