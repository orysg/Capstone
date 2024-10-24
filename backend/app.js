// app.js
const express = require('express');
const cors = require('cors');
const db = require('./models');
const routes = require('./routes');

const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Sync database (drop tables in development only)
const isProduction = process.env.NODE_ENV === 'production';
db.sequelize.sync({ force: !isProduction }).then(() => {
  console.log("Database synchronized.");

  if (!isProduction) {
    const { exec } = require('child_process');
    exec('npx sequelize-cli db:seed --seed seeders/default_users.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running seeder: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Seeder stderr: ${stderr}`);
        return;
      }
      console.log(`Seeder stdout: ${stdout}`);
    });
  }
});

// Routes setup
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
