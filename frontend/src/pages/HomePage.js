import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import './HomePage.css';

function HomePage() {
  const [fallStatus, setFallStatus] = useState('No recent falls detected');
  const [lastFallTimestamp, setLastFallTimestamp] = useState(null);
  const [status, setStatus] = useState('Idle');

  
  // Simulated API call to fetch fall status
  const fetchFallStatus = async () => {
    /*  Commented because i think api is handled backend now
    try {
      const response = await axios.get('http://localhost:5000/api_data');
      const data = response.data;
      const latestFall = data.find(event => event.fallen === true);
      
      if (latestFall) {
        setFallStatus('Fall detected');
        setLastFallTimestamp(new Date().getTime());
        setStatus('Alarm triggered');
      } else {
        setFallStatus('No recent falls detected');
        setLastFallTimestamp(null);
        setStatus('Idle');
      }
    } catch (error) {
      console.error('Error fetching fall status:', error);
    }
      */
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      fetchFallStatus();
    }, 1000);
  
    return () => clearInterval(interval);
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
