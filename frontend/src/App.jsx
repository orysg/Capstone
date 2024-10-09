// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import Sidebar from './components/Sidebar';

const Layout = ({ children }) => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 p-4">{children}</div>
  </div>
);
const App = () => {
  //const [isAuthenticated, setIsAuthenticated] = useState(false); // Use state for authentication
  //const DashboardWithSidebar = withSidebar(Dashboard);

  return (
    <AuthProvider>
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default App;

/*
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import SignIn from './components/SignIn';
import History from './pages/History';
import FallReport from './pages/FallReport';
import Sidebar from './components/Sidebar'; 
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

import './index.css';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar /> {}

        <div className="flex-1">
          <header className="App-header">
            <nav className="nav-bar">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
              <Link to="/signin" className="nav-link">Sign In</Link>
              <Link to="/history" className="nav-link">History</Link>
            </nav>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/history" element={<History />} />
              <Route path="/fall-report" element={<FallReport />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
*/