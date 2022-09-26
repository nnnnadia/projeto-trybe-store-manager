const express = require('express');
const { saleController } = require('../controllers');
const { saleValidation, saleProductValidation } = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  saleValidation.saleValidation,
  saleProductValidation.saleProductValidation,
  saleController.postSale,
);

module.exports = router;
