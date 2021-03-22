const SalesModel = require('../models/SalesModel');
const status = require('../utils/statusDictionary');
const messages = require('../utils/messageDictionary');
const { ThrowError } = require('../middlewares/errorHandler/errorHandler');

const createSaleService = async (payload) => {
  if (!payload) throw new ThrowError(status.BAD_REQUEST, messages.NO_EMPTY_FIELDS);
  return SalesModel.createSale(payload);
};

const getAllSales = async () => {
  const sales = await SalesModel.getAllSales();
  return sales;
};

const getSaleById = async (saleId) => {
  const sale = await SalesModel.getSaleById(saleId);
  const saleProducts = await SalesModel.getSaleProducts(saleId)
  const responsePayload = {
    sale,
    saleProducts
  }
  return responsePayload;
};

module.exports = {
  getSaleById,
  getAllSales,
  createSaleService,
};
