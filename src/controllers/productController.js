const { productService } = require('../services');

const getProducts = async (req, res, next) => {
  const { id } = req.params;
  const result = await productService.findProducts(id);
  if (!result.type) return res.status(200).json(result.content);
  next(result);
};

module.exports = {
  getProducts,
};
