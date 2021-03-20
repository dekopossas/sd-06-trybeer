const userModel = require('../model/User');
const { NOT_FOUND, CONFLICT } = require('../schema/statusSchema');

// Return all Users
const getAll = async () => {
  const users = await userModel.getAll();
  return users;
};

// Add new Users
const createNewUser = async (name, email, password, role) => {
  const user = await userModel.createUser(name, email, password, role);
  return user;
};

// Verify user by email and password
const verifyUser = async (email, password) => {
  const user = await userModel.verifyUser(email, password);
  return user;
};

// FindById
const findById = async (id) => {
  const user = await userModel.findById(id);
  return user;
};

// Update name
const update = async (id, name) => {
  const user = await userModel.updateName(id, name);
  return user;
};

// Verify Email
const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const [exist] = await userModel.findByEmail(email);

  if (exist) {
    res.status(CONFLICT).json({ message: 'E-mail already in database.' });
  }

  next();
};

// Verify id
const verifyId = async (req, res, next) => {
  const { id } = req.params;
  const exist = await userModel.findById(id);

  if (!exist) {
    res.status(NOT_FOUND).json({ message: 'incorreted id' });
  }

  next();
};

module.exports = {
  getAll,
  createNewUser,
  verifyUser,
  verifyEmail,
  findById,
  update,
  verifyId,
};
