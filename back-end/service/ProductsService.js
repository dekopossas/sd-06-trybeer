const productsModel = require('../model/Products');

const SECRET = 'senhasupersecreta.com';

// Return all products
const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

module.exports = {
  getAll,
};