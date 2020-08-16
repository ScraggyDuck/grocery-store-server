const Category = require('./../models/Category.model');
const factory = require('./../utils/handlerFactory');

exports.getAll = factory.getAll(Category);
exports.create = factory.createOne(Category);
