const express = require('express');
const { saleController } = require('../controllers');
const { saleValidation, saleProductValidation } = require('../middlewares');

const router = express.Router();

router.get('/', saleController.getSales);
router.get(
  '/:id',
  saleValidation.idValidation,
  saleController.getSales,
);

router.post(
  '/',
  saleValidation.saleValidation,
  saleProductValidation.saleProductValidation,
  saleController.postSale,
);

module.exports = router;
