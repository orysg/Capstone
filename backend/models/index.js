const sequelize = require('../config/db.config');
const User = require('./users.model');
const Radar = require('./radars.model');
const RadarsUsers = require('./radarsUsers.model');
const Fall = require('./falls.model');
const AuthAttempt = require('./auth_attempts.model');

User.belongsToMany(Radar, { through: RadarsUsers });
Radar.belongsToMany(User, { through: RadarsUsers });
AuthAttempt.belongsTo(User, { foreignKey: 'UserID' });
Fall.belongsTo(Radar, { foreignKey: 'RadarID' });

module.exports = {
  sequelize,
  User,
  Radar,
  RadarsUsers,
  Fall,
  AuthAttempt
};