const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productService.allProducts();

    if (!allProducts) return res.status(404).json({ message: 'produto não encontrado.' });

    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { getAllProducts };
