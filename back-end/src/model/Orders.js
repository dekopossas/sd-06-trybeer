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
        s.id, s.sale_date,
        s.total_price, s.status,
        p.name, p.price, sp.quantity,
        ROUND((p.price * sp.quantity), 2) as total
      FROM sales as s
      JOIN sales_products as sp
      ON sp.sale_id = s.id
      JOIN products as p
      ON p.id = sp.product_id
      WHERE s.id = ?;`, [orderId],
    ).then(([orderInfo]) => orderInfo || null)
  );

  exports.update = async (id, status) =>
  connection
    .execute('UPDATE sales SET status = ? WHERE id = ?', [status, id])
    .then(([_]) => this.getDetails(id));
