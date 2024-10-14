const express = require('express');
const cors = require('cors');
const path = require('path'); // Import path for handling file paths
// const multer = require('multer'); // Remove multer import
const imageRoutes = require('./routes/image'); // Import image routes
const authRoutes = require('./routes/auth'); // Other routes (adjust as needed)
const fallRoutes = require('./routes/falls'); // Other routes (adjust as needed)
const radarsRoutes = require('./routes/radars'); // Other routes (adjust as needed)
const protectedRoutes = require('./routes/protected'); // Other routes (adjust as needed)

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
