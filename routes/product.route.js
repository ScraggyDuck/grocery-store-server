const express = require('express');
const productController = require('../controllers/product.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router
  .route('/')
  .get(productController.getAll)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.createProduct
  );

router.route('/:slug').get(productController.getProduct);

module.exports = router;
