// server.js
const app = require('./app');  // Import the Express app
const http = require('http');

// Set the port for the server to listen on
const PORT = process.env.PORT || 4000;

// Create the HTTP server
const server = http.createServer(app);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
