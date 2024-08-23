import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [fallStatus, setFallStatus] = useState('No recent falls detected');
  const [lastFallTimestamp, setLastFallTimestamp] = useState(null);
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    phone: '',
  });

  // Function to fetch fall status and update state
  const fetchFallStatus = async () => {
    try {
      const response = await axios.get('/api/fall-status'); // Replace with your API endpoint
      setFallStatus(response.data.status);
      setLastFallTimestamp(response.data.lastFallTimestamp);
    } catch (error) {
      console.error('Error fetching fall status:', error);
    }
  };

  // Function to update emergency contact information
  const updateEmergencyContact = (newContact) => {
    setEmergencyContact(newContact);
    // Save the updated contact to your backend (e.g., using another API call)
  };

  useEffect(() => {
    fetchFallStatus();
    // Fetch emergency contact information from your backend if needed
  }, []);

  return (
    <div className="home-page">
      <header className="header">
        <h1>Fall Detection App</h1>
        <p>Your safety is our priority.</p>
      </header>
      <main className="main">
        <div className="fall-status">
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
      </main>
      <footer className="footer">
        &copy; 2023 Your Company
      </footer>
    </div>
  );
}

export default HomePage;