const { productService } = require('../services');

const saleProductValidation = async (req, _res, next) => {
  const sales = req.body;
  const saleProducts = await Promise.all(sales
    .map(({ productId }) => productService.findProducts(productId)));
  const foundError = saleProducts.find(({ type }) => type !== null);
  if (foundError) return next(foundError);
  next();
};

module.exports = {
  saleProductValidation,
};
