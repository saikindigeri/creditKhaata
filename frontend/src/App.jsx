import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Customers from './pages/Customers';
import EditCustomer from './pages/EditCustomer';
import Loans from './pages/Loans';
import Repayments from './pages/Repayments';
import Summary from './pages/Summary';
import EditLoan from './pages/EditLoan';
import FetchRepayments from './pages/FetchRepayments';

function App() {
  return (
 
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<EditCustomer />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/loans/:id" element={<EditLoan />} /> 
            <Route path="/loan/:loanId" element={<FetchRepayments/>} /> 
            <Route path="/repayments/:loanId" element={<Repayments />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </Router>
    
  );
}

export default App;