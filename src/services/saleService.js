const { saleModel } = require('../models');
const saleProductService = require('./saleProductService');

const registerSale = async (sales) => {
  try {
    const date = new Date();
    const saleId = await saleModel.createSale(date);
    await Promise.all(saleProductService.registerSaleProduct(sales, saleId));
    const sale = {
      id: saleId,
      itemsSold: await saleProductService.findSaleProductBySaleId(saleId),
    };
    return { type: null, content: sale };
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: 'Internal error' };
  }
};

module.exports = {
  registerSale,
};
