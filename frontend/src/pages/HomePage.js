import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './HomePage.css';

function HomePage() {
  const [fallStatus, setFallStatus] = useState('No recent falls detected');
  const [lastFallTimestamp, setLastFallTimestamp] = useState(null);
  const [status, setStatus] = useState('Idle');
  const [location, setLocation] = useState(null);

  // Simulated API call to fetch fall status
  const fetchFallStatus = async () => {
    /* Commented because I think the API is handled backend now
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

  // Function to simulate a fall and fetch location
  const simulateFall = () => {
    setFallStatus('Fall detected');
    setLastFallTimestamp(new Date().getTime());
    setStatus('Alarm triggered');
    fetchLocation();
  };

  // Function to get the current location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Function to handle successful location retrieval
  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    const locationString = `Latitude: ${latitude}, Longitude: ${longitude}`;
    setLocation(locationString);

    // Ask user if the detected location is correct
    if (window.confirm(`Your current location is:\n${locationString}\nIs this correct?`)) {
      alert("Location confirmed.");
      // Further actions based on confirmation
    } else {
      alert("Location not confirmed. Please try again.");
      // Handle the case where the user says the location is incorrect
    }
  };

  // Function to handle errors during location retrieval
  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
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
        {location && <p>Current Location: {location}</p>}
      </main>
      <footer className="footer">
        &copy; 2024 FrontGuard
      </footer>
    </div>
  );
}

export default HomePage;
