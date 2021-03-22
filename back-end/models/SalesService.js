const moment = require('moment');
const connection = require('./connection');

const insertSaleProductDetails = async (saleProductData, saleId) => {
  const productDetailsValues = (
    saleProductData.map((product) => [saleId, product.prod_id, product.qty]));
  const productDetailsQuery = (
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ?;');
  const [response] = await connection.query(productDetailsQuery, [productDetailsValues]);
  console.log(response, 'response');
};

const createOne = async (saleProductData, saleDetailsData) => {
  const { userId, price, address, number, status } = saleDetailsData;  
  const date = moment().format('YYYY-MM-DD HH:mm:ss');
  const saleDetailsQuery = ('INSERT INTO sales' 
  + '(user_id, total_price, delivery_address, delivery_number, sale_date, status)'
  + 'VALUES(?, ?, ?, ?, ?, ?);');
  const [response] = await connection.query(saleDetailsQuery,
    [userId, price, address, number, date, status]);

  await insertSaleProductDetails(saleProductData, response.insertId);
  return { insertId: response.insertId, date };
};

const getAllByUserId = async (id) => {
  const sales = await connection.execute(
    'SELECT * FROM sales WHERE user_id = ?', [id],
);
  return sales;
};

const getAllOrders = async () => {
  const sales = await connection.execute(
    'SELECT * FROM sales',
);
  return sales;
};

const updatedOne = async (id) => {
  await connection.execute(
    'UPDATE sales WHERE sale_id ? REPLACE(status, ?)',
    [id, 'Entregue'],
  );
};

module.exports = {
  createOne, getAllByUserId, getAllOrders, updatedOne,
};