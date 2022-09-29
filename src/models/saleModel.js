const connection = require('./connection');

const readAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id AS saleId, date, product_id AS productId, quantity
    FROM sales_products AS sp
    JOIN sales AS s
    ON sp.sale_id = s.id`,
  );
  return result;
};

const readSaleById = async (saleId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
    [saleId],
  );
  return result;
};

const readSaleProductBySaleIdDated = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT date, product_id AS productId, quantity
    FROM sales_products AS sp
    JOIN sales AS s
    ON sp.sale_id = s.id
    WHERE s.id = ?`,
    [saleId],
  );
  return result;
};

const createSale = async (date) => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUE (?)', [date]);
  return insertId;
};

const deleteSale = async (saleId) => connection
  .execute(
    'DELETE FROM sales WHERE id = ?',
    [saleId],
  );

module.exports = {
  createSale,
  deleteSale,
  readAllSales,
  readSaleById,
  readSaleProductBySaleIdDated,
};
