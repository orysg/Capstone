const Radar = require('../models/radars.model');

// Create a new Radar
const createRadar = async (req, res) => {
  try {
    const radar = await Radar.create(req.body);
    res.status(201).json(radar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Radars
const getAllRadars = async (req, res) => {
  try {
    const radars = await Radar.findAll();
    res.status(200).json(radars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Radar by ID
const getRadarById = async (req, res) => {
  try {
    const radar = await Radar.findByPk(req.params.id);
    if (!radar) return res.status(404).json({ message: 'Radar not found' });
    res.status(200).json(radar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the total number of radars
const getTotalRadars = async (req, res) => {
  try {
    const totalRadars = await Radar.count();
    return res.status(200).json({ totalRadars });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a Radar
const deleteRadar = async (req, res) => {
  try {
    const result = await Radar.destroy({ where: { RadarID: req.params.id } });
    if (!result) return res.status(404).json({ message: 'Radar not found' });
    res.status(200).json({ message: 'Radar deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRadar,
  getAllRadars,
  getRadarById,
  getTotalRadars,
  deleteRadar
};