const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  FirstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  LastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  PasswordHash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  UserType: {
    type: DataTypes.ENUM('Admin', 'Carer', 'Guest'),
    defaultValue: 'Admin',
    allowNull: false
  }
}, {
  tableName: 'Users',
  timestamps: false,
});

module.exports = User;