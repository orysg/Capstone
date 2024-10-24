const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Invitations = sequelize.define('Invitations', {
  InvitationID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  Token: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  Status: {
    type: DataTypes.ENUM('Pending', 'Accepted', 'Expired'),
    defaultValue: 'Pending',
    allowNull: false,
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  ExpiresAt: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false,
  tableName: 'Invitations',
});

module.exports = Invitations;
