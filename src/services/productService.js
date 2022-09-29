const { productModel } = require('../models');

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

const findProducts = async (id) => {
  try {
    const products = {
      type: null,
      content: !id
        ? await productModel.readAllProducts()
        : await productModel.readProductById(id),
    };
    if (products.content) return products;
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: 'Internal error' };
  }
};

const changeProduct = async (id, { name }) => {
  try {
    if (await productModel.updateProduct(id, name)) {
      return {
        type: null,
        content: await productModel.readProductById(id),
      };
    }
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: 'Internal error' };
  }
};

const removeProduct = async (id) => {
  try {
    if (await productModel.deleteProduct(id)) return { type: null };
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: 'Internal error' };
  }
};

module.exports = {
  changeProduct,
  findProducts,
  registerProduct,
  removeProduct,
};
