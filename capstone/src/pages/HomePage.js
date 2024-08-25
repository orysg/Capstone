import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [fallStatus, setFallStatus] = useState('No recent falls detected');
  const [lastFallTimestamp, setLastFallTimestamp] = useState(null);
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    phone: '',
  });
  const [status, setStatus] = useState('Idle'); // Add a state for the status

  // Function to fetch fall status and update state
  const fetchFallStatus = async () => {
    try {
      const response = await axios.get('/api/fall-status'); // Replace API endpoint
      setFallStatus(response.data.status);
      setLastFallTimestamp(response.data.lastFallTimestamp);

      // Update the status based on fall detection
      if (response.data.status === 'Fall detected') {
        setStatus('Alarm triggered');
      } else {
        setStatus('Idle');
      }
    } catch (error) {
      console.error('Error fetching fall status:', error);
    }
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

  const getFallStatusColor = () => {
    switch (fallStatus) {
      case 'Fall detected':
        return 'fall-detected';
      default:
        return 'fall-safe';
    }
  };
  
  const setFallStatusToDetected = () => {
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
        <div className={`fall-status ${getFallStatusColor()}`}>
          <h2>Fall Status: {fallStatus}</h2>
          {lastFallTimestamp && (
            <p>Last fall detected on: {new Date(lastFallTimestamp).toLocaleDateString()}</p>
          )}
        </div>
        
        <div className="emergency-contact">
          <h2>Emergency Contact</h2>
          <p><strong>Name:</strong> {emergencyContact.name}</p>
          <p><strong>Phone:</strong> {emergencyContact.phone}</p>
          <button onClick={() => updateEmergencyContact({ name: 'John Doe', phone: '123-456-7890' })}>Update Contact</button>
        </div>
        
        <div className="status">
          <h2>Status: {status}</h2>
        </div>
        <button onClick={setFallStatusToDetected}>Simulate Fall</button>
        
        {/* Indicator */}
        <div className="fall-indicator">
          <div className={`circle ${getFallStatusColor()}`}></div>
        </div>
      </main>

      <footer className="footer">
        &copy; 2024 FrontGuard
      </footer>
    </div>
  );
}


export default HomePage;