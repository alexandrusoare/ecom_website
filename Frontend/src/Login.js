import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useLogin} from './LoginContext';
import './Login.css';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const {loggedIn, setLoggedIn, setUserId } = useLogin();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

  // Create a data object with the login credentials
  const data = {
    username: username,
    password: password,
  };
  
  // Make a POST request to your login API endpoint
  fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.status === 200) {
        setLoggedIn(true);
        // Redirect to the Courses page
        navigate('/courses');
      } else {
        console.error('Invalid username or password');
        // Handle error or display an error message
      }
      return response.json();
    })
    .then(data => {
      setUserId(data.userId);
      console.log(data.userId)

    // Redirect to the Courses page
    navigate('/courses');
      console.log(data); // Response from the server
      // Handle success or display an appropriate message
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error or display an error message
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

  // Create a data object with the form field values
  const data = {
    name,
    username,
    email,
    phone,
    password,
  };

  // Make a POST request to your API endpoint
  fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setIsRegistering(false); // Switch back to the login card
      // Clear the registration form fields
      setName('');
      setUsername('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword(''); // Response from the server
      // Handle success or display an appropriate message
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error or display an error message
    });
  };

  return (
    <div className="login-container">
      {isRegistering ? (
        <div className="register-card">
          <h2 className="login-title">Register</h2>
          <input
            type="text"
            placeholder="Name"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="login-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="login-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleRegister}>
            Register
          </button>
          <p className="toggle-link" onClick={() => setIsRegistering(false)}>
            Go back to login page
          </p>
        </div>
      ) : (
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <p className="toggle-link" onClick={(e) => setIsRegistering(true)}>
            Don't have an account? Register here
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
