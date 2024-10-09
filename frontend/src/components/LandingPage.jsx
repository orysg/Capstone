// src/components/LandingPage.jsx
import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen bg-purple-600 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to FrontGuard</h1>
        <p className="text-xl mb-8">Your reliable fall detection solution for safety and peace of mind.</p>
        <div>
          <a href="/signin" className="bg-white text-purple-600 font-semibold px-6 py-2 rounded shadow hover:bg-gray-200 transition duration-200">
            Sign Up / Sign In
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <img src="https://via.placeholder.com/150" alt="Feature 1" className="mb-4" />
            <h3 className="text-xl font-semibold">24/7 Monitoring</h3>
            <p>Continuous monitoring to ensure safety at all times.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <img src="https://via.placeholder.com/150" alt="Feature 2" className="mb-4" />
            <h3 className="text-xl font-semibold">Instant Alerts</h3>
            <p>Receive immediate notifications in case of falls.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <img src="https://via.placeholder.com/150" alt="Feature 3" className="mb-4" />
            <h3 className="text-xl font-semibold">User-Friendly Interface</h3>
            <p>Easy to use application for all age groups.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-200">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="mb-4">Have questions? Reach out to us!</p>
          <form className="flex flex-col items-center">
            <input type="text" placeholder="Your Name" className="mb-4 p-2 border border-gray-300 rounded w-full" />
            <input type="email" placeholder="Your Email" className="mb-4 p-2 border border-gray-300 rounded w-full" />
            <textarea placeholder="Your Message" className="mb-4 p-2 border border-gray-300 rounded w-full" rows="4" />
            <button type="submit" className="bg-purple-600 text-white font-semibold px-6 py-2 rounded shadow hover:bg-purple-700 transition duration-200">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
