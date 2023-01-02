const { productService } = require('../services');

const getProducts = async (req, res, next) => {
  const { id } = req.params;
  const result = await productService.findProducts(id);
  if (!result.type) return res.status(200).json(result.content);
  next(result);
};

const getProductsByName = async (req, res, next) => {
  const { q } = req.query;
  const result = await productService.findProductsByQuery(q);
  if (!result.type) return res.status(200).json(result.content);
  next(result);
};

const postProduct = async (req, res, next) => {
  const product = req.body;
  const result = await productService.registerProduct(product);
  if (!result.type) return res.status(201).json(result.content);
  next(result);
};

const putProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = req.body;
  const result = await productService.changeProduct(id, product);
  if (!result.type) return res.status(200).json(result.content);
  next(result);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const result = await productService.removeProduct(id);
  if (!result.type) return res.status(204).json({});
  next(result);
};

module.exports = {
  deleteProduct,
  getProducts,
  getProductsByName,
  postProduct,
  putProduct,
};
