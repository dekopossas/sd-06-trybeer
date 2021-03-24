const connection = require('./connection');

exports.getAll = async (userId) =>
  connection.execute(
    'SELECT id, sale_date, total_price FROM sales WHERE user_id = ?',
    [userId],
  )
  .then(([sale]) => sale);

  exports.getDetails = async (orderId) => (
    connection.execute(
      `SELECT
        s.sale_date, p.name, sp.quantity,
        ROUND((p.price * sp.quantity), 2) as total
      FROM
        sales as s
      JOIN
        sales_products as sp
      ON
        sp.sale_id = s.id
      JOIN
        products as p
      ON
        p.id = sp.product_id
      WHERE
        s.id = 2;`, [orderId],
    ).then(([orderInfo]) => orderInfo || null)
  );