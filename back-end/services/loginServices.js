const loginModels = require('../models/loginModels');

// Get all users
const getAll = async () => {
  const users = await loginModels.getAll();
  return users;
};

// Create a user
const create = async (name, email, password, role) => {
  const users = await loginModels.create(name, email, password, role);
  return users;
};

module.exports = { getAll, create };