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

module.exports = {
  readAllProducts,
  readProductById,
};
