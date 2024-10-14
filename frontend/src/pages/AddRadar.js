import React, { useState } from 'react';

const AddRadar = () => {
  const [ip, setIp] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError(null);
    setSuccess(null);

    // Validate inputs (you can add more validation as needed)
    if (!ip || !latitude || !longitude) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/radars', { // Adjust the URL if necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ip,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
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
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Add Radar</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>IP Address:</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Radar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default AddRadar;
