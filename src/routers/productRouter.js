const express = require('express');
const { productController } = require('../controllers');
const { productValidation } = require('../middlewares');

const router = express.Router();

router.get('/search', productController.getProductsByName);
router.get(
  '/:id',
  productValidation.idValidation,
  productController.getProducts,
);
router.get('/', productController.getProducts);

router.post(
  '/',
  productValidation.nameValidation,
  productController.postProduct,
);

router.put(
  '/:id',
  productValidation.idValidation,
  productValidation.nameValidation,
  productController.putProduct,
);

router.delete(
  '/:id',
  productValidation.idValidation,
  productController.deleteProduct,
);

module.exports = router;
