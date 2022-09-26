const { expect } = require('chai');
const sinon = require('sinon');
const {
  saleProductService,
} = require('../../../src/services');
const { saleProductModel } = require('../../../src/models');

describe('Teste de unidade do saleProductService', function () {
  describe('.registerSaleProduct: ', function () {
    it('Retorna um array', async function () {
      sinon.stub(saleProductModel, 'createSaleProduct').returns({});
      const result = await saleProductService.registerSaleProduct([], 1);
      expect(result).to.be.deep.equal([]);
    });
  });
  afterEach(sinon.restore);
});
