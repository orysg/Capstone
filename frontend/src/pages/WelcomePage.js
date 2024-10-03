import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // Create a separate CSS file for this page

function WelcomePage() {
  return (
    <div className="welcome-container">
      {/* Header Section with Logo */}
      <header className="header">
        <img src="logo512.png" alt="RudderTech Logo" className="logo" />
        <h1 className="app-title">Welcome to RudderTech</h1>
        <p className="app-description">
          At RudderTech, we aim to ensure user safety through our innovative fall detection app.
        </p>
      </header>

      {/* Sign-in and Sign-up Buttons */}
      <div className="auth-buttons">
        <Link to="/signin" className="btn btn-signin">Sign In</Link>
        <Link to="/signup" className="btn btn-signup">Create Company Account</Link>
      </div>

      {/* Company Details & App Features */}
      <section className="company-details">
        <h2>About RudderTech</h2>
        <p>
          Welcome to RudderTech, a forward-thinking tech company dedicated to enhancing user safety through innovative solutions. Our latest app is designed with one primary goal in mind: ensuring the well-being of our users by detecting falls in real time. We understand that quick responses can be crucial in preventing severe injuries, especially for the elderly and individuals with mobility challenges.
        </p>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h3>Learn More About Our App</h3>
        <Link to="/learnmore" className="btn btn-learn-more">Learn More</Link>
      </section>

      {/* Footer with links */}
      <footer className="footer">
        <Link to="/privacy-policy">Privacy Policy</Link> | 
        <Link to="/terms-of-service">Terms of Service</Link> | 
        <Link to="/contact">Contact Us</Link>
      </footer>
    </div>
  );
}

export default WelcomePage;