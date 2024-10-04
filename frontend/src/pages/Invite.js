/*
import React, { useState } from 'react';
import axios from 'axios';
import './Invite.css'; 

function Invite() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    const { name, email } = formData;

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      const response = await axios.post('/api/admin/invite', { name, email });
      if (response.status === 200) {
        setSuccess('Invite sent successfully!');
        setFormData({ name: '', email: '' }); // Clear form
      }
    } catch (error) {
      setError('Failed to send invite, please try again.');
    }
  };

  return (
    <div className="invite-container">
      <div className="invite-box">
        <h2 className="invite-title">Invite Nurse</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="invite-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Nurse Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Nurse Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="invite-button">Send Invite</button>
        </form>
      </div>
    </div>
  );
}

export default Invite;
*/