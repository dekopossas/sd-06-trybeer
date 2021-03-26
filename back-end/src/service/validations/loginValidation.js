const userModel = require('../../model/usersModel');

const BAD_REQUEST = 400;

const invalidEntries = {
  payload: { message: 'Invalid entries. Try again.' },
  status: BAD_REQUEST,
};

const loginValidation = async ({ email, password }) => {
  if (!email || !password) return invalidEntries;

  const [result] = await userModel.getUserByEmail(email);
  if (result) {
    const { password: storagePassword } = result;
    if (storagePassword === password) return result;
  }

  return invalidEntries;
};

module.exports = loginValidation;
