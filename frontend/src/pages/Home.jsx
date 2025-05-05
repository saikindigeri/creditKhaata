import { Link } from 'react-router-dom';

const Home = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Welcome to CreditKhaata</h1>
      {token ? (
        <p>Manage your customers and loans from the navigation bar.</p>
      ) : (
        <p>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>{' '}
          or{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>{' '}
          to start managing your credit ledger.
        </p>
      )}
    </div>
  );
};

export default Home;