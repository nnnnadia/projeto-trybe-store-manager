const insertId = 42;

const saleProductsFromSPS = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  },
];

const registeredSale = {
  id: insertId,
  itemsSold: saleProductsFromSPS,
}

module.exports = {
  insertId,
  saleProductsFromSPS,
  registeredSale,
};
