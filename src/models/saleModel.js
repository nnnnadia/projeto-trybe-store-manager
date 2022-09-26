const connection = require('./connection');

const createSale = async (date) => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUE (?)', [date]);
  return insertId;
};

module.exports = {
  createSale,
};
