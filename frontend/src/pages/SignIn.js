import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css'; 

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In Form Data:', formData);
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="app-title">Fall Detect<span className="dot">.</span></h1>
        <h2 className="login-title">Login</h2>
        <p className="welcome-text">Welcome back. Input your details to pick up where you left off.</p>

        <form onSubmit={handleSubmit} className="signin-form">
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
