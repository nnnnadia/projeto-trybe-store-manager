const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../../src/app');
const connection = require('../../../src/models/connection');

const { productsFromDB } = require('./mocks/productController.mock');

describe('Teste de integração do productController', function () {
  it('Requisição GET -> /products', async function () {
    sinon.stub(connection, 'execute').resolves(productsFromDB);
    const response = await chai
      .request(app)
      .get('/products');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(...productsFromDB);
  });
  it('Requisição GET -> /products/:id', async function () {
    sinon.stub(connection, 'execute').resolves(productsFromDB);
    const response = await chai
      .request(app)
      .get('/products/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(...productsFromDB[0]);
  });
  it('Chama o middleware de erro caso algum problema aconteça', async function() {
    sinon.stub(connection, 'execute').throws();
    const response = await chai
      .request(app)
      .get('/products');
    expect(response.status).to.be.equal(500);
    expect(response.body).to.be.deep.equal({ message: 'Internal error' });
  });
  afterEach(sinon.restore);
});
