const AuthAttempt = require('../models/auth_attempts.model');

// Create a new AuthAttempt
const createAuthAttempt = async (req, res) => {
  try {
    const authAttempt = await AuthAttempt.create(req.body);
    res.status(201).json(authAttempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all AuthAttempts
const getAllAuthAttempts = async (req, res) => {
  try {
    const authAttempts = await AuthAttempt.findAll();
    res.status(200).json(authAttempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single AuthAttempt by ID
const getAuthAttemptById = async (req, res) => {
  try {
    const authAttempt = await AuthAttempt.findByPk(req.params.id);
    if (!authAttempt) return res.status(404).json({ message: 'AuthAttempt not found' });
    res.status(200).json(authAttempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an AuthAttempt
const deleteAuthAttempt = async (req, res) => {
  try {
    const result = await AuthAttempt.destroy({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ message: 'AuthAttempt not found' });
    res.status(200).json({ message: 'AuthAttempt deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAuthAttempt,
  getAllAuthAttempts,
  getAuthAttemptById,
  deleteAuthAttempt,
};