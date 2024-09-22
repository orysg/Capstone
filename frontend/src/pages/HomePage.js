import React, { useState, useEffect } from 'react';
import './HomePage.css';

function HomePage() {
  const [fallStatus, setFallStatus] = useState('Fall not detected');
  const [lastFallTimestamp, setLastFallTimestamp] = useState(null);
  const [status, setStatus] = useState('Idle');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // fetchFallStatus(); (placeholder for fetching data)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const simulateFall = () => {
    setFallStatus('Fall detected');
    setLastFallTimestamp(new Date().getTime());
    setStatus('Alarm triggered');
    fetchLocation();
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation not supported.");
    }
  };

  const showPosition = (position) => {
    const locationString = `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`;
    setLocation(locationString);
    if (window.confirm(`Is this location correct?\n${locationString}`)) {
      alert("Location confirmed.");
    } else {
      alert("Location not confirmed.");
    }
  };

  const showError = (error) => {
    alert(`Error: ${error.message}`);
  };

  const getFallStatusClass = () => {
    return fallStatus === 'Fall detected' ? 'fall-detected' : 'fall-safe';
  };

  return (
    <div className="container">
      {/* Fall Status Box */}
      <div className={`status-box ${getFallStatusClass()}`}>
        <h1>Fall Status</h1>
        <p>{fallStatus}</p>
        {lastFallTimestamp && (
          <p>Last fall: {new Date(lastFallTimestamp).toLocaleString()}</p>
        )}
      </div>

      {/* Report Section */}
      <div className="report-section">
        <div className="report-title">Report</div>

        {/* Monthly Fall Activity */}
        <div className="monthly-activity">
          <h2>Monthly Fall Activity</h2>
          <div className="activity-legend">
            <div>
              <div className="legend-circle no-falls"></div>
              <span>No Falls</span>
            </div>
            <div>
              <div className="legend-circle falls"></div>
              <span>Falls</span>
            </div>
            <div>
              <div className="legend-circle false-alarm"></div>
              <span>False Alarm</span>
            </div>
          </div>
        </div>

        {/* Last Fall Detected */}
        <div className="last-fall">
          <h2>Last Fall Detected</h2>
          <div className="last-fall-details">
            <p>Date: 25/08/2024 12:00pm</p>
            <p>Severity: Moderate</p>
            <p>Emergency Contact: Nurse Mary</p>
            <p>Response time: 2 minutes</p>
          </div>
        </div>
      </div>

      {/* Simulate Fall Button */}
      <button className="simulate-fall-btn" onClick={simulateFall}>
        Simulate Fall
      </button>

      {location && <p>Current Location: {location}</p>}
    </div>
  );
}

export default HomePage;
