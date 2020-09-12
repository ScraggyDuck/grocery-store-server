const Order = require('../models/order.model');
const factory = require('../utils/handlerFactory');

exports.createOrder = factory.createOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.updateOrder = factory.updateOne(Order);
exports.getAllOrder = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
