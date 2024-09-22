import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use Link for navigation
import './Signup.css'; 

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign Up Form Data:', formData);

    // Redirect to Sign In after successful sign-up
    navigate('/signin');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="app-title">Fall Detect<span className="dot">.</span></h1>
        <h2 className="signup-title">Sign Up</h2>
        <p className="welcome-text">Create your account and get started.</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
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
            <p>Already have an account? <Link to="/signin">Login</Link></p> {/* Link to Sign In */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
