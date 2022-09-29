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

router.get('/', saleController.getSales);
router.get(
  '/:id',
  saleValidation.idValidation,
  saleController.getSales,
);

router.put(
  '/:id',
  saleValidation.idValidation,
  saleValidation.saleValidation,
  saleProductValidation.saleProductValidation,
  saleController.putSale,
);

router.delete(
  '/:id',
  saleValidation.idValidation,
  saleController.deleteSale,
);

module.exports = router;
