const { expect } = require('chai');
const sinon = require('sinon');
const {
  saleService,
  saleProductService,
} = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const {
  insertId,
  saleProductsFromSPS,
  registeredSale,
} = require('./mocks/saleService.mock');

describe('Teste de unidade do saleService', function () {
  describe('.registerSale: ', function () {
    it('Retorna todos os produtos quando chamado sem parâmetro', async function () {
      sinon.stub(saleModel, 'createSale').resolves(insertId);
      sinon.stub(saleProductService, 'registerSaleProduct').returns([]);
      sinon.stub(saleProductService, 'findSaleProductBySaleId').resolves(saleProductsFromSPS);
      const result = await saleService.registerSale(saleProductsFromSPS);
      expect(result.content).to.be.deep.equal(registeredSale);
      expect(result.type).to.be.null;
    });
    it('Retorna um objeto de erro quando o servidor não responde como esperado', async function () {
      sinon.stub(saleModel, 'createSale').throws();
      const result = await saleService.registerSale(saleProductsFromSPS);
      expect(result.message).to.be.equal('Internal error');
      expect(result.type).to.be.equal('INTERNAL_ERROR');
    });
  });
  afterEach(sinon.restore);
});
