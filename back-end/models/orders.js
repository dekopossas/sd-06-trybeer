const connection = require('./connection');

const coll = 'sales';

const createOrder = async (id, totalPrice, streetInput, houseNumberInput) => {
  const date = new Date();
  const status = 'pendente';

  const [result] = await connection.execute(
    `INSERT INTO Trybeer.${coll}
    (user_id, total_price, delivery_address, delivery_number, sale_date, status)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [id, totalPrice, streetInput, houseNumberInput, date, status],
  );

  return result;
};

const updateSalesProduct = async (insertId, checkoutProducts) => {
  checkoutProducts.forEach((product) => {
    const { id: productId, productQuantity } = product;

    connection.execute(
    `INSERT INTO Trybeer.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`, [insertId, productId, productQuantity],
    );
  });
};

const getOrdersByUser = async (id) => {
  const [orders] = await connection.execute('SELECT * FROM Trybeer.sales WHERE user_id = ?', [id]);

  return orders;
};

module.exports = {
  createOrder,
  updateSalesProduct,
  getOrdersByUser,
};