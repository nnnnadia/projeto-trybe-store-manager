const { productModel } = require('../models');

const findProducts = async (id) => {
  try {
    const products = {
      type: null,
      content: !id
        ? await productModel.readAllProducts()
        : await productModel.readProductById(id),
    };
    if (products.content) return products;
    return {
      type: 'PRODUCT_NOT_FOUND', message: 'Product not found',
    };
    } catch (err) {
    return { type: 'INTERNAL_ERROR', message: 'Internal error' };
  }
};

const registerProduct = async (newProduct) => {
  try {
    const id = await productModel.createProduct(newProduct);
    const product = {
      type: null,
      content: await productModel.readProductById(id),
    };
    if (product.content) return product;
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: 'Internal error' };
  }
};

module.exports = {
  findProducts,
  registerProduct,
};
