const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { exec } = require('child_process'); // Import child_process for executing MATLAB scripts
const path = require('path'); // Import path for handling file paths
const app = express();
const PORT = process.env.PORT || 4000;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

app.use(cors({
  origin: 'http://localhost:3000',  // Adjust this to your front-end URL
  credentials: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

const authRoutes = require('./routes/auth');
const fallRoutes = require('./routes/falls');
const radarsRoutes = require('./routes/radars');
const imageRoutes = require('./routes/image');
const protectedRoutes = require('./routes/protected');

app.use('/api', authRoutes); // Registration & Login
app.use('/api/falls', fallRoutes); // Get & Add Falls
app.use('/api/radars', radarsRoutes); // Add Radars
app.use('/api', imageRoutes); // Image generation
app.use('/api/protected', protectedRoutes); // Protected example

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
