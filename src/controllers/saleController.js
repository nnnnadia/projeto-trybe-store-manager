const { saleService } = require('../services');

const getSales = async (req, res, next) => {
  const { id } = req.params;
  const result = await saleService.findSales(id);
  if (!result.type) return res.status(200).json(result.content);
  next(result);
};

const postSale = async (req, res, next) => {
  const sales = req.body;
  const result = await saleService.registerSale(sales);
  if (!result.type) return res.status(201).json(result.content);
  next(result);
};

const deleteSale = async (req, res, next) => {
  const { id } = req.params;
  const result = await saleService.removeSale(id);
  if (!result.type) return res.status(204).json({});
  next(result);
};

module.exports = {
  deleteSale,
  getSales,
  postSale,
};
