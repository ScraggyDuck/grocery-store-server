const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router
  .route('/')
  .get(productController.getAll)
  .post(productController.createProduct);

router.route('/:slug').get(productController.getProduct);

module.exports = router;
