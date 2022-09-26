const { saleProductModel } = require('../models');

const findSaleProductBySaleId = async (saleId) => saleProductModel.readSaleProductBySaleId(saleId);

const registerSaleProduct = (sales, saleId) => sales
  .map((sale) => saleProductModel.createSaleProduct(sale, saleId));

module.exports = {
  findSaleProductBySaleId,
  registerSaleProduct,
};
