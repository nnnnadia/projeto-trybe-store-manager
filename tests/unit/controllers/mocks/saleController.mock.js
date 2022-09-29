const saleProductsFromBody = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const registeredSale = {
  id: 42,
  itemsSold: saleProductsFromBody,
};

const resultFromSS = {
  type: null,
  content: registeredSale,
};

module.exports = {
  saleProductsFromBody,
  registeredSale,
  resultFromSS,
};
