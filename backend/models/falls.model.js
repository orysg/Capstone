const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Fall = sequelize.define('Fall', {
  FallID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  RadarID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Radars',
      key: 'RadarID'
    },
    onDelete: 'CASCADE'
  },
  FallType: {
    type: DataTypes.ENUM('Slow', 'Fast', 'False'),
    allowNull: false,
  },
  Timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  ResponseStatus: {
    type: DataTypes.ENUM('Pending', 'Acknowledged', 'Resolved'),
    defaultValue: 'Pending',
  }
}, {
  tableName: 'Falls',
  timestamps: false,
});

module.exports = Fall;