const express = require('express');
const { productController } = require('../controllers');
const { productValidation } = require('../middlewares');

const router = express.Router();

router.get('/', productController.getProducts);
router.get(
  '/:id',
  productValidation.idValidation,
  productController.getProducts,
);

router.post(
  '/',
  productValidation.nameValidation,
  productController.postProduct,
);

module.exports = router;
