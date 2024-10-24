const express = require('express');
const cors = require('cors');
const pool = require('./db');
const path = require('path'); // Import path for handling file paths
// const multer = require('multer'); // Remove multer import
const imageRoutes = require('./routes/image'); // Import image routes
const authRoutes = require('./routes/auth'); // Other routes (adjust as needed)
const fallRoutes = require('./routes/falls'); // Other routes (adjust as needed)
const radarsRoutes = require('./routes/radars'); // Other routes (adjust as needed)
const protectedRoutes = require('./routes/protected'); // Other routes (adjust as needed)
const usersRoutes = require('./routes/users');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3000',  // Adjust this to your front-end URL
  credentials: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

app.use('/api', authRoutes); // Registration & Login
app.use('/api/falls', fallRoutes); // Get & Add Falls
app.use('/api/radars', radarsRoutes); // Add Radars
app.use('/api', imageRoutes); // Image generation
app.use('/api/protected', protectedRoutes); // Protected example
app.use('/api/users', usersRoutes); //user retrieval

app.use((err, req, res, next) => {  // req and next are required for Express middleware signature, but we can omit them if unused
  console.error(err.stack);  // Log the full error stack trace
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,      // Return the error message to the client
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}  // Show stack trace only in development mode
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

