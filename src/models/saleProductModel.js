const connection = require('./connection');

const readSaleProductBySaleId = async (saleId) => {
  const [result] = await connection.execute(
    'SELECT product_id AS productId, quantity FROM sales_products WHERE sale_id = ?',
    [saleId],
  );
  return result;
};

const createSaleProduct = async ({ productId, quantity }, saleId) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales_products (product_id, quantity, sale_id) VALUE (?, ?, ?)',
    [productId, quantity, saleId],
  );
  return insertId;
};

module.exports = {
  createSaleProduct,
  readSaleProductBySaleId,
};
