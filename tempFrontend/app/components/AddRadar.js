import React, { useState } from 'react';
// import './AddRadar.css'; // Import the CSS file

const AddRadar = () => {
  const [ip, setIp] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isOn, setIsOn] = useState(true); // New state for radar status
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError(null);
    setSuccess(null);

    // Validate inputs
    if (!ip || !latitude || !longitude) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/radars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ip,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          isOn, // Include radar status
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSuccess('Radar added successfully!');
      // Optionally clear the form fields
      setIp('');
      setLatitude('');
      setLongitude('');
      setIsOn(true); // Reset to default
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-radar-container">
      <h2>Add Radar</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>IP Address:</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            required
            placeholder="Enter IP Address"
          />
        </div>
        <div className="form-group">
          <label>Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
            placeholder="Enter Latitude"
          />
        </div>
        <div className="form-group">
          <label>Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
            placeholder="Enter Longitude"
          />
        </div>
        <div className="form-group">
          <label>Radar Status:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="on"
                checked={isOn}
                onChange={() => setIsOn(true)}
              />
              On
            </label>
            <label>
              <input
                type="radio"
                value="off"
                checked={!isOn}
                onChange={() => setIsOn(false)}
              />
              Off
            </label>
            <div className={`radar-status ${isOn ? 'status-on' : 'status-off'}`}></div>
          </div>
        </div>
        <button type="submit">Add Radar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default AddRadar;