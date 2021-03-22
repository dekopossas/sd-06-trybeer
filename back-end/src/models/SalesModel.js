const connection = require('./connection');

const createSale = async (payload) => {
  const { user_id: userId, 
    total_price: totalPrice, 
    delivery_address: deliveryAddress, 
    delivery_number: deliveryNumber, 
    sale_date: saleDate, 
    status } = payload;
  
  const [response] = await connection
    .execute(`INSERT INTO sales
      (user_id, total_price, delivery_address, delivery_number, sale_date, status) 
      VALUES (?, ?, ?, ?, ?, ?)`, 
    [userId, 
      totalPrice, 
      deliveryAddress, 
      deliveryNumber, 
      saleDate, 
      status]);
  return response;
};

const createSaleProducts = async (insertId, insertProducts) => {
  await insertProducts.forEach(async (product) => {
    await connection.execute('INSERT INTO sales_products VALUES (?, ?, ?)',
    [
      insertId,
      product.id,
      product.quantity
    ])
  });
}

const getAllSales = async () => {
  const [sales] = await connection.execute('SELECT * FROM sales');
  return sales;
};

const getSaleById = async (saleId) => {
  const [sale] = await connection.execute('SELECT * FROM Trybeer.sales WHERE id=?', [saleId])
  return sale;
};

const getSaleProducts = async (saleId) => {
  const query = `
  SELECT sp.product_id, sp.quantity, p.name, p.price
  FROM Trybeer.sales_products AS sp
  JOIN Trybeer.products AS p
  ON p.id = sp.product_id WHERE sp.sale_id = ?`
  const [saleProducts] = await connection.execute(`${query}`, [saleId])
  return saleProducts;
}


const fullfilSale = async (saleId) => {
  const newStatus = 'entregue'
  const query = `
  UPDATE sales SET status = ? WHERE id=?`
  const [saleProducts] = await connection.execute(`${query}`, [newStatus, saleId])
  return saleProducts;
}
module.exports = {
  getSaleById,
  getSaleProducts,
  getAllSales,
  createSale,
  fullfilSale,
  createSaleProducts
}
