import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css'; 

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // To display error messages

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

  // Email Regex for validating email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password Regex for validating password (minimum 8 characters, at least one letter and one number)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    // Validate password (min 8 characters, at least 1 letter and 1 number)
    if (!validatePassword(password)) {
      setErrorMessage('Password format is incorrect');
      return;
    }

    // If both email and password are valid, clear the error message
    setErrorMessage('');
    console.log('Sign In Form Data:', formData);
    // Proceed with sign-in logic
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="app-title">Fall Detect<span className="dot">.</span></h1>
        <h2 className="login-title">Login</h2>
        <p className="welcome-text">Welcome back. Input your details to pick up where you left off.</p>

        <form onSubmit={handleSubmit} className="signin-form" noValidate> {/* Disable native validation */}
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
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
          <div className="hint-text">Hint here</div>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="login-button">Login</button>

          <div className="signup-link">
            <p>Don't have an account? <Link to="/signup">Signup</Link></p> {/* Link to Sign Up */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
