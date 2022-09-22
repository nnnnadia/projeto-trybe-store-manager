const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const { productsFromDB } = require('./mocks/productModel.mock');

describe('Teste de unidade do productModel', function () {
  it('Realizando leitura de dados com o readAllProducts', async function () {
    sinon.stub(connection, 'execute').resolves(productsFromDB);
    const result = await productModel.readAllProducts();
    expect(result).to.be.deep.equals(...productsFromDB);
  });
  it('Realizando leitura de apenas um produto', async function () {
    sinon.stub(connection, 'execute').resolves(productsFromDB);
    const result = await productModel.readProductById(1);
    expect(result).to.be.deep.equals(...productsFromDB[0]);
  });
  afterEach(sinon.restore);
});