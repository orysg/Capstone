import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Signin from './pages/SignIn';  
import History from './pages/History';
import FallReport from './pages/FallReport';
import WelcomePage from './pages/WelcomePage';
import LearnMore from './pages/LearnMore';
import TestAPI from './pages/TestAPI'; // Import the TestAPI component
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Moved nav inside the div and styled it */}
        <header className="App-header">
          <nav className="nav-bar">
            <Link to="/homepage" className="nav-link">Home</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
            <Link to="/signin" className="nav-link">Sign In</Link> {/* Add Sign In link */}
            <Link to="/history" className="nav-link">History</Link>
            <Link to="/test-api" className="nav-link">Test API</Link> {/* Add Test API link */}
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<WelcomePage/>} />
            <Route path="/learnmore" element={<LearnMore/>} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} /> {/* Add route for Sign In page */}
            <Route path="/history" element={<History />} />
            <Route path="/fall-report" element={<FallReport />} />
            <Route path="/test-api" element={<TestAPI />} /> {/* Route for Test API */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
