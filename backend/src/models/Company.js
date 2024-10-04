/*
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Company.associate = (models) => {
    Company.hasMany(models.User, {
      foreignKey: 'companyId',
      as: 'users',
    });
  };

  return Company;
};
2. Modify server.js to Include Routes
Your existing server.js will be extended to include routes for admin signup and nurse invite. I will also help you use Sequelize with your PostgreSQL connection.

Updated server.js:
javascript
Copy code
const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { User, Company } = require('./models'); // Sequelize models
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Admin Signup Route
app.post('/api/admin/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    // Create company and admin user
    const newCompany = await Company.create({ name });
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      companyId: newCompany.id,
    });

    res.status(201).send('Admin signed up successfully');
  } catch (error) {
    console.error('Error signing up admin:', error);
    res.status(500).send('Error signing up admin');
  }
});

// Nurse Invite Route
app.post('/api/admin/invite', async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      role: 'nurse',
      companyId: req.admin.companyId, // Assuming req.admin is already authenticated
    });

    const inviteLink = `http://localhost:3000/signup/${newUser.id}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: 'your-email@gmail.com', pass: 'your-email-password' }
    });

    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'You are invited to join Fall Detect',
      text: `Click this link to set your password: ${inviteLink}`,
    });

    res.status(200).send('Invite sent successfully');
  } catch (error) {
    console.error('Error sending invite:', error);
    res.status(500).send('Error sending invite');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
3. Integrating Sequelize with PostgreSQL
You already have a PostgreSQL connection in db.js. Now, let’s integrate Sequelize and set up the connection properly.

In db.js, we’ll initialize Sequelize.

db.js:

javascript
Copy code
const { Pool } = require('pg');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT || 5432,
  }
);

sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL via Sequelize'))
  .catch((err) => console.error('Connection error', err));

module.exports = sequelize;

*/