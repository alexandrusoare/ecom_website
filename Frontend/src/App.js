import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useLogin } from './LoginContext';
import Login from './Login';
import Courses from './Courses';
import Topbar from './Topbar';
import Profile from './Profile';
import ShoppingCart from './ShoppingCart';
import PaymentProcess from './PaymentProcess';

function App() {
  const { loggedIn } = useLogin();

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route
          path="/courses"
          element={loggedIn ? <Courses /> : <Navigate to="/" replace />}
        />
        <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate to="/" replace />} />
        <Route path='/shopping' element={loggedIn ? <ShoppingCart/> : <Navigate to="/" replace />} />
        <Route path='/payment' element= {<PaymentProcess/>} />
        </Routes>
    </Router>
  );
}

export default App;