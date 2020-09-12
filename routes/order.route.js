const express = require('express');
const orderController = require('../controllers/order.controller');

const router = express.Router();

router
  .route('/')
  .get(orderController.getAllOrder)
  .post(orderController.createOrder);

router.route('/:id').get(orderController.getOrder);

module.exports = router;
