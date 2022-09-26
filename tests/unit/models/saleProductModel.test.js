const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { saleProductModel } = require('../../../src/models');

const { saleProductsFromDB } = require('./mocks/saleProductModel.mock');

describe('Teste de unidade do saleModel', function () {
  describe('.readSaleProductBySaleId: ', function () {
    it('Realizando leitura de dados pelo id da venda', async function () {
      sinon.stub(connection, 'execute').resolves(saleProductsFromDB);
      const result = await saleProductModel.readSaleProductBySaleId(1);
      expect(result).to.be.deep.equal(...saleProductsFromDB);
    });
  });
  afterEach(sinon.restore);
});
