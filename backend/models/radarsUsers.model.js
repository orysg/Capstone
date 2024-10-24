const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const RadarsUsers = sequelize.define('RadarsUsers', {
  RadarID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Radars',
      key: 'RadarID'
    },
    onDelete: 'CASCADE'
  },
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'UserID'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'RadarsUsers',
  timestamps: false,
});

module.exports = RadarsUsers;