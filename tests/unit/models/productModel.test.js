const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const { productsFromDB, insertIdFromDB } = require('./mocks/productModel.mock');

describe('Teste de unidade do productModel', function () {
  describe('.readAllProducts: ', function () {
    it('Realizando leitura de dados com o readAllProducts', async function () {
      sinon.stub(connection, 'execute').resolves(productsFromDB);
      const result = await productModel.readAllProducts();
      expect(result).to.be.deep.equals(...productsFromDB);
    });
  });
  describe('.readProductById: ', function () {
    it('Realizando leitura de apenas um produto', async function () {
      sinon.stub(connection, 'execute').resolves(productsFromDB);
      const result = await productModel.readProductById(1);
      expect(result).to.be.deep.equals(...productsFromDB[0]);
    });
  });
  describe('.createProduct: ', function () {
    it('Cria um novo produto com o createProduct', async function () {
      sinon.stub(connection, 'execute').resolves(insertIdFromDB);
      const result = await productModel.createProduct({ name: 'produto' });
      expect(result).to.be.equal(42);
    });
  });
  afterEach(sinon.restore);
});