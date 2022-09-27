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

module.exports = {
  createSale,
  readAllSales,
  readSaleProductBySaleIdDated,
};
