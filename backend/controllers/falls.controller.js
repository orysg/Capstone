const Fall = require('../models/falls.model');

// Create a new Fall
const createFall = async (req, res) => {
  try {
    const fall = await Fall.create(req.body);
    res.status(201).json(fall);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Falls
const getAllFalls = async (req, res) => {
  try {
    const falls = await Fall.findAll();
    res.status(200).json(falls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Fall by ID
const getFallById = async (req, res) => {
  try {
    const fall = await Fall.findByPk(req.params.id);
    if (!fall) return res.status(404).json({ message: 'Fall not found' });
    res.status(200).json(fall);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the total number of falls
const getTotalFalls = async (req, res) => {
  try {
    const totalFalls = await Fall.count();
    return res.status(200).json({ totalFalls });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a Fall
const deleteFall = async (req, res) => {
  try {
    const result = await Fall.destroy({ where: { FallID: req.params.id } });
    if (!result) return res.status(404).json({ message: 'Fall not found' });
    res.status(200).json({ message: 'Fall deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFall,
  getAllFalls,
  getFallById,
  getTotalFalls,
  deleteFall
};