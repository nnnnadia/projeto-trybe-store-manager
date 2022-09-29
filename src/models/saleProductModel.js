const connection = require('./connection');

const createSaleProduct = async ({ productId, quantity }, saleId) => connection
  .execute(
    'INSERT INTO sales_products (product_id, quantity, sale_id) VALUE (?, ?, ?)',
    [productId, quantity, saleId],
  );

const readSaleProductBySaleId = async (saleId) => {
  const [result] = await connection.execute(
    'SELECT product_id AS productId, quantity FROM sales_products WHERE sale_id = ?',
    [saleId],
  );
  return result;
};

const deleteSaleProduct = async (saleId) => connection
  .execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [saleId],
  );

module.exports = {
  createSaleProduct,
  deleteSaleProduct,
  readSaleProductBySaleId,
};
