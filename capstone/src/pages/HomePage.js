import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

function HomePage() {
  const [fallStatus, setFallStatus] = useState('No recent falls detected');
  const [lastFallTimestamp, setLastFallTimestamp] = useState(null);
  const [status, setStatus] = useState('Idle');

  // Simulated API call to fetch fall status
  const fetchFallStatus = async () => {
    try {
      // Replace with your actual API call
      // const response = await axios.get('/api/fall-status');
      // setFallStatus(response.data.status);
      // setLastFallTimestamp(response.data.lastFallTimestamp);
    } catch (error) {
      console.error('Error fetching fall status:', error);
    }
  };

  useEffect(() => {
    fetchFallStatus();
  }, []);

  // Function to simulate a fall
  const simulateFall = () => {
    setFallStatus('Fall detected');
    setLastFallTimestamp(new Date().getTime());
    setStatus('Alarm triggered');
  };

  // Determine CSS class based on fall status
  const getFallStatusColorClass = () => {
    return fallStatus === 'Fall detected' ? 'fall-detected' : 'fall-safe';
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>Fall Detection App</h1>
        <p>Your safety is our priority.</p>
      </header>
      <main className="main">
        <div className="fall-status-container">
          <div className={`fall-status ${getFallStatusColorClass()}`}>
            <h2>Fall Status: {fallStatus}</h2>
            {lastFallTimestamp && (
              <p>Last fall detected on: {new Date(lastFallTimestamp).toLocaleDateString()}</p>
            )}
          </div>
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
