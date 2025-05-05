import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log('Navbar component rendered'); // Debug: Verify component renders

  useEffect(() => {
    console.log('useEffect triggered in Navbar'); // Debug: Verify useEffect runs
    const token = localStorage.getItem('token');
    console.log('Token in useEffect:', token); // Debug: Log token
    console.log('API URL:', import.meta.env.VITE_API_URL); // Debug: Log API URL

    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/auth/user`, {
          headers: { 'x-auth-token': token },
        })
        .then((res) => {
          console.log('User data fetched:', res.data); // Debug: Log user data
          setUser(res.data);
          setError('');
        })
        .catch((err) => {
          console.error('Error fetching user:', err.response?.data || err.message);
          localStorage.removeItem('token');
          setError('Failed to authenticate. Please log in again.');
          setTimeout(() => setError(''), 5000);
        });
    } else {
      console.log('No token found, skipping user fetch'); // Debug: Log when no token
    }
  }, []);

  const handleLogout = () => {
    console.log('Logout triggered'); // Debug: Verify logout
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          CreditKhaata
        </Link>
        <div className="space-x-4">
          {error && (
            <div className="absolute top-4 right-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          {user ? (
            <>
              <Link to="/customers" className="text-white hover:text-gray-300">
                Customers
              </Link>
              <Link to="/loans" className="text-white hover:text-gray-300">
                Loans
              </Link>
              <Link to="/summary" className="text-white hover:text-gray-300">
                Summary
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;