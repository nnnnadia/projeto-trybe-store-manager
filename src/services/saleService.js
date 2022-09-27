const { saleModel } = require('../models');
const saleProductService = require('./saleProductService');

const findSales = async (id) => {
  try {
    const sales = {
      type: null,
      content: !id
        ? await saleModel.readAllSales()
        : await saleModel.readSaleProductBySaleIdDated(id),
    };
    if (sales.content.length !== 0) return sales;
    return {
      type: 'SALE_NOT_FOUND', message: 'Sale not found',
    };
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: 'Internal error' };
  }
};

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
  findSales,
  registerSale,
};
