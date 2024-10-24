const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Radar = sequelize.define('Radar', {
  RadarID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  IP: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  Latitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: false,
  },
  Longitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: false,
  }
}, {
  tableName: 'Radars',
  timestamps: false,
});

module.exports = Radar;