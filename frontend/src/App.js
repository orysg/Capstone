import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';  // Import the SignIn component
import History from './pages/History';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
            <Link to="/signin" className="nav-link">Sign In</Link> {/* Add Sign In link */}
            <Link to="/history" className="nav-link">History</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} /> {/* Add route for Sign In page */}
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
