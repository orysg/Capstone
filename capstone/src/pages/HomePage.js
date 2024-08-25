import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css'

const FALL_API_ENDPOINT = '/api/fall-status'; // Define API endpoint as a constant

function HomePage() {
  const [fallStatus, setFallStatus] = useState('No recent falls detected');
  const [lastFallTimestamp, setLastFallTimestamp] = useState(null);
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    phone: '',
  });
  const [status, setStatus] = useState('Idle');

  // Fetch fall status and update state
  const fetchFallStatus = async () => {
    /*
    try {
      const response = await axios.get(FALL_API_ENDPOINT);
      setFallStatus(response.data.status);
      setLastFallTimestamp(response.data.lastFallTimestamp);
      setStatus(response.data.status === 'Fall detected' ? 'Alarm triggered' : 'Idle'); // Update status in a single line
    } catch (error) {
      console.error('Error fetching fall status:', error);
    }
      */
  };

  // Function to update emergency contact information
  const updateEmergencyContact = (newContact) => {
    setEmergencyContact(newContact);
    // Save the updated contact to backend (e.g., using another API call)
  };

  useEffect(() => {
    fetchFallStatus();
    // Fetch emergency contact information from backend if needed
  }, []);

  const getFallStatusColorClass = () => {
    // Use className for consistency
    return fallStatus === 'Fall detected' ? 'fall-detected' : 'fall-safe';
  };

  const simulateFall = () => {
    setFallStatus('Fall detected');
    setLastFallTimestamp(new Date().getTime());
    setStatus('Alarm triggered');
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>Fall Detection App</h1>
        <p>Your safety is our priority.</p>
      </header>
      <main className="main">
        <div className="fall-status-container" data-testid="fall-status-container"> {/* Add data-testid for testing */}
          <div className={`fall-status ${getFallStatusColorClass()}`}>
            <h2>Fall Status: {fallStatus}</h2>
            {lastFallTimestamp && (
              <p>Last fall detected on: {new Date(lastFallTimestamp).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        <div className="emergency-contact">
          <h2>Emergency Contact</h2>
          <p>
            <strong>Name:</strong> {emergencyContact.name}
          </p>
          <p>
            <strong>Phone:</strong> {emergencyContact.phone}
          </p>
          <button onClick={() => updateEmergencyContact({ name: 'John Doe', phone: '123-456-7890' })}>
            Update Contact
          </button>
        </div>

        <div className="status">
          <h2>Status: {status}</h2>
        </div>
        <button onClick={simulateFall}>Simulate Fall</button>
      </main>

      <footer className="footer">
        &copy; 2024 FrontGuard
      </footer>
    </div>
  );
}

export default HomePage;