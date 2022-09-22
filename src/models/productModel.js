const connection = require('./connection');

const readAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const readProductById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return result;
};

const createProduct = async (product) => {
  const columns = Object.keys(product)
    .map((key) => `${key}`)
    .join(', ');
  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');
  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );
  return insertId;
};

module.exports = {
  readAllProducts,
  readProductById,
  createProduct,
};
