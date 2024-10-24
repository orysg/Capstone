const { Pool } = require('pg');
require('dotenv').config(); 

const env = process.env.NODE_ENV || 'development';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST || 'db',  // Use 'db' for the host in Docker
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
});

const MAX_RETRIES = 10;
const RETRY_INTERVAL_MS = 5000;

const ensureConnection = async (retries = MAX_RETRIES) => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL');
  } catch (err) {
    console.error('Connection error', err.stack);

    if (retries > 0) {
      console.log(`Retrying connection in ${RETRY_INTERVAL_MS / 1000} seconds... (${retries} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL_MS));
      return ensureConnection(retries - 1);
    } else {
      console.error('Max retries reached. Could not connect to PostgreSQL.');
      process.exit(1);
    }
  }
};

ensureConnection();

module.exports = pool;
