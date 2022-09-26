const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');

const { correctInputFromBody, insertIdFromDB } = require('./mocks/saleModel.mock');

describe('Teste de unidade do saleModel', function () {
  describe('.createSale: ', function () {
    it('Cria um novo produto com o createSale', async function () {
      sinon.stub(connection, 'execute').resolves(insertIdFromDB);
      const result = await saleModel.createSale(correctInputFromBody);
      expect(result).to.be.equal(42);
    });
  });
  afterEach(sinon.restore);
});
