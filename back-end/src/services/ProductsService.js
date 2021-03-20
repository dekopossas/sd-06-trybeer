const products = require('../models/Products');

const formatUrl = (url) => url.split(' ').join('%20');

const getAll = async () => {
  const productsArray = await products.getAll();
  const formatedProducts = productsArray.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 0,
      urlImage: formatUrl(product.url_image),
  }));

  return formatedProducts;
};

module.exports = {
  getAll,
};