const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../../src/app');
const connection = require('../../../src/models/connection');

const {
  productsFromDB,
  insertIdFromDB,
  newlyCreatedProductFromDB,
} = require('./mocks/productController.mock');

describe('Teste de integração do productController', function () {
  describe('.getProducts: ', function () {
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
    it('Chama o middleware de erro caso algum problema aconteça', async function () {
      sinon.stub(connection, 'execute').throws();
      const response = await chai
        .request(app)
        .get('/products');
      expect(response.status).to.be.equal(500);
      expect(response.body).to.be.deep.equal({ message: 'Internal error' });
    });
  });
  describe('.postProduct: ', function () {
    it('Cria com sucesso um novo produto', async function () {
      sinon
        .stub(connection, 'execute')
        .onFirstCall()
        .resolves(insertIdFromDB)
        .onSecondCall()
        .resolves(newlyCreatedProductFromDB);
      const response = await chai
        .request(app)
        .post('/products')
        .send({ name: 'produto X' });
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(...newlyCreatedProductFromDB[0]);
    });
    it('Chama o middleware de erro caso algum problema aconteça', async function () {
      sinon.stub(connection, 'execute').throws();
      const response = await chai
        .request(app)
        .post('/products')
        .send({ name: 'produto X' });
      expect(response.status).to.be.equal(500);
      expect(response.body).to.be.deep.equal({ message: 'Internal error' });
    });
  });
  afterEach(sinon.restore);
});

describe('Testa validações pré-controllers', function () {
  describe('.idValidation: ', function () {
    it('Não aceita id que não seja numérico', async function () {
      const response = await chai
        .request(app)
        .get('/products/id')
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ message: 'Invalid value' });
    });
  });
  describe('.nameValidation: ', function () {
    it('Não aceita nomes com menos de 5 caracteres', async function () {
      const response = await chai
        .request(app)
        .post('/products')
        .send({ name: 'pr' });
      expect(response.status).to.be.equal(422);
      expect(response.body).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
    });
    it('Não aceita nomes com menos de 5 caracteres', async function () {
      const response = await chai
        .request(app)
        .post('/products')
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: '"name" is required' });
    });
  });
});
