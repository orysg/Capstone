import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';

const AddFall = () => {
  const [fallType, setFallType] = useState('');
  const [radarId, setRadarId] = useState('');
  const [responseStatus, setResponseStatus] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fallData = {
        radarId: radarId,
        fallType: fallType,
        responseStatus: responseStatus,
      };

    try {
      const response = await fetch('http://localhost:4000/api/falls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fallData),
      });

      if (!response.ok) {
        throw new Error('Failed to add fall');
      }

      const data = await response.json();
      setSuccess('Fall added successfully!');
      setError(null); // Clear any previous error
      // Optionally, reset form fields
      setFallType('');
      setResponseStatus('');
    } catch (error) {
      setError(error.message);
      setSuccess(null); // Clear any previous success message
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div>
          <label>
            Radar ID:
            <input
              type="text"
              value={radarId}
              onChange={(e) => setRadarId(e.target.value)}
              placeholder="Radar ID"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Fall Type:
            <input
              type="text"
              value={fallType}
              onChange={(e) => setFallType(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Response Status:
            <input
              type="text"
              value={responseStatus}
              onChange={(e) => setResponseStatus(e.target.value)}
              required
            />
          </label>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <Button type="submit" color="blue">
          Add Fall
        </Button>
      </form>
    </div>
  );
};

export default AddFall;
