const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { productsFromModel } = require('./mocks/productService.mock');

describe('Teste de unidade do productService', function () {
  it('Retorna todos os produtos quando chamado sem parâmetro', async function () {
    sinon.stub(productModel, 'readAllProducts').resolves(productsFromModel);
    const result = await productService.findProducts();
    expect(result.content).to.be.deep.equal(productsFromModel);
    expect(result.type).to.be.null;
  });
  it('Retorna o produto com o id do parâmetro', async function () {
    sinon.stub(productModel, 'readProductById').resolves(productsFromModel[0]);
    const result = await productService.findProducts(1);
    expect(result.content).to.be.deep.equal(productsFromModel[0]);
    expect(result.type).to.be.null;
  });
  it('Retorna um objeto de erro quando o servidor não responde como esperado', async function () {
    sinon.stub(productModel, 'readAllProducts').throws();
    const result = await productService.findProducts();
    expect(result.message).to.be.equal('Internal error');
    expect(result.type).to.be.equal('INTERNAL_ERROR');
  });
  it('Retorna um objeto de erro quando não existe produto com o id do parâmetro', async function () {
    sinon.stub(productModel, 'readProductById').resolves(undefined);
    const result = await productService.findProducts(1);
    expect(result.message).to.be.equal('Product not found');
    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
  });
  afterEach(sinon.restore);
});