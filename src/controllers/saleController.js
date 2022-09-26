const { saleService } = require('../services');

const postSale = async (req, res, next) => {
  const sales = req.body;
  const result = await saleService.registerSale(sales);
  if (!result.type) return res.status(201).json(result.content);
  next(result);
};

module.exports = {
  postSale,
};
