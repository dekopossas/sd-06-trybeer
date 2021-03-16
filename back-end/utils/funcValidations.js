const validateEmail = (email) => {
  const mailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return mailRegex.test(email);
};

const validateName = (name) => {
  const nameRegex = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/;
  if (nameRegex.test(name)) {
    return (name.length >= 12) ? true : false;
  }
  return false;
};

const validatePassword = (password) => (password.length >= 6) ? true : false;

module.exports = {
  validateEmail,
  validateName,
  validatePassword
}
