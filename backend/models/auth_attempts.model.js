const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const AuthAttempt = sequelize.define('AuthAttempt', {
  AuthAttemptID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'UserID'
    },
    onDelete: 'CASCADE'
  },
  Timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  LoginStatus: {
    type: DataTypes.ENUM('Success', 'Failure', 'Blocked'),
    allowNull: false,
  },
  IP: {
    type: DataTypes.STRING(45),
  },
  Device: {
    type: DataTypes.STRING(255),
  }
}, {
  tableName: 'AuthAttempts',
  timestamps: false,
});

module.exports = AuthAttempt;