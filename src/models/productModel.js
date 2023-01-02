const connection = require('./connection');

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

const readProductByQuery = async (query) => {
  const queryBetween = `%${query}%`;
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE name LIKE ?',
    [queryBetween],
  );
  return result;
};

const updateProduct = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE products
    SET name = ?
    WHERE id = ?`,
    [name, id],
  );
  return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM products
    WHERE ID = ?`,
    [id],
  );
  return affectedRows;
};

module.exports = {
  createProduct,
  readAllProducts,
  readProductById,
  readProductByQuery,
  updateProduct,
  deleteProduct,
};
