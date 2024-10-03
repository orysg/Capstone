import React from 'react';
import './LearnMore.css'; // Create a separate CSS file for this page

function LearnMore() {
  return (
    <div className="learn-more-container">
      {/* Header Section */}
      <header className="header">
        <h1 className="page-title">Learn More About Our App</h1>
        <p className="page-description">Discover the advanced features and setup process of our fall detection app.</p>
      </header>

      {/* App Features Section */}
      <section className="features-section">
        <h3>App Features</h3>
        <ul className="features-list">
          <li><strong>AI-Based Fall Detection:</strong> Our cutting-edge AI accurately detects falls and distinguishes them from normal movements, reducing false alarms.</li>
          <li><strong>Real-Time Fall Alerts:</strong> Instantly sends alerts to designated contacts, ensuring help arrives as quickly as possible.</li>
          <li><strong>User-Friendly Interface:</strong> Easy-to-use interface designed for users of all ages and tech skill levels.</li>
          <li><strong>24/7 Monitoring:</strong> Provides continuous monitoring to keep users safe around the clock.</li>
          <li><strong>Customizable Notifications:</strong> Customize who gets alerted and how notifications are delivered, via SMS, email, or app alerts.</li>
          <li><strong>Lightweight & Battery-Efficient:</strong> Optimized to run in the background with minimal battery drain.</li>
        </ul>
      </section>

      {/* How to Set Up Section */}
      <section className="setup-section">
        <h3>How to Set Up</h3>
        <ol className="setup-steps">
          <li><strong>Download the App:</strong> Download the RudderTech app from the App Store or Google Play Store.</li>
          <li><strong>Create a Company Account:</strong> Sign up as a company admin to set up the app for your organization.</li>
          <li><strong>Add Team Members:</strong> Invite carers or team members via their email to monitor fall detection in real-time.</li>
          <li><strong>Customize Notifications:</strong> Set up who should receive alerts and how (SMS, email, or in-app).</li>
          <li><strong>Activate 24/7 Monitoring:</strong> Once the setup is complete, activate 24/7 monitoring to ensure round-the-clock protection.</li>
        </ol>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>Need more help? <a href="/contact">Contact Support</a></p>
      </footer>
    </div>
  );
}

export default LearnMore;
