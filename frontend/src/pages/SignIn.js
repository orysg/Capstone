import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection after login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await axios.post('http://backend:4000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Store the token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to the dashboard or home page
        navigate('/dashboard');
      } else {
        setErrorMessage('Incorrect email or password.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        console.log('An error occurred:', error.message);
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="app-title">Fall Detect<span className="dot">.</span></h1>
        <h2 className="login-title">Login</h2>
        <p className="welcome-text">Welcome back. Input your details to pick up where you left off.</p>

        <form onSubmit={handleSubmit} className="signin-form" noValidate>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
          <div className="input-group password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="show-password" onClick={handleShowPasswordChange}>
              {showPassword ? '🔓' : '🔒'}
            </span>
          </div>
          <div className="hint-text"></div>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="login-button">Login</button>

          <div className="signup-link">
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
