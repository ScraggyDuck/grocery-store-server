const express = require('express');
const categoryController = require('../controllers/category.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAll)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.create
  );

module.exports = router;
