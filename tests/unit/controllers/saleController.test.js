const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const { saleService } = require('../../../src/services');

const {
  saleProductsFromBody,
  registeredSale,
  resultFromSS,
} = require('./mocks/saleController.mock');

describe('Teste de integração do saleController', function () {
  describe('.postSale: ', function () {
    it('Cria com sucesso uma nova venda', async function () {
      sinon.stub(saleService, 'registerSale').resolves(resultFromSS);
      const response = await chai
        .request(app)
        .post('/sales')
        .send(saleProductsFromBody);
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(registeredSale);
    });
    it('Chama o middleware de erro caso algum problema aconteça', async function () {
      sinon.stub(connection, 'execute').throws();
      const response = await chai
        .request(app)
        .post('/sales')
        .send(saleProductsFromBody);
      expect(response.status).to.be.equal(500);
      expect(response.body).to.be.deep.equal({ message: 'Internal error' });
    });
  });
  afterEach(sinon.restore);
});
