const User = require('../models/users.model');

// Create a new User
const createUser = async (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;

  try {
    // Only admins should be able to access this route, middleware will handle the check
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      PasswordHash: hashedPassword,
      UserType: userType  // Admin can specify the user type
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a User
const deleteUser = async (req, res) => {
  try {
    const result = await User.destroy({ where: { UserID: req.params.id } });
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};