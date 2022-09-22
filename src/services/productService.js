const { productModel } = require('../models');

const findProducts = async (id) => {
  const products = { type: null };
  try {
    products.content = !id
      ? await productModel.readAllProducts()
      : await productModel.readProductById(id);
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: 'Internal error' };
  }
  if (products.content) return products;
  return {
    type: 'PRODUCT_NOT_FOUND', message: 'Product not found',
  };
};

module.exports = {
  findProducts,
};
