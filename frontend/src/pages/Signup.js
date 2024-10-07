import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

axios.defaults.timeout = 5000;

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',  // Changed from 'name' to 'firstName'
    lastName: '',   // Added 'lastName' field
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { firstName, lastName, email, password, confirmPassword } = formData;
  
    // Input validations
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters, include an uppercase letter, a number, and a special character.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    setError('');
  
    try {
      const response = await axios.post('http://localhost:4000/api/register', {
        email,
        firstName,
        lastName,
        password,
        userType: 'Admin',  // Specify the user type
      });
  
      if (response.status === 201 || response.status === 200) {
        // Handle successful registration
        navigate('/signin');
      } else {
        setError('Something went wrong, please try again.');
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      } else if (error.response) {
        if (error.response.data && error.response.data.error) {
          setError(error.response.data.error);  // Display specific server error
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="app-title">Fall Detect<span className="dot">.</span></h1>
        <h2 className="signup-title">Sign Up</h2>
        <p className="welcome-text">Create your account.</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-button">Sign Up</button>

          <div className="login-link">
            <p>Already have an account? <Link to="/signin">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
