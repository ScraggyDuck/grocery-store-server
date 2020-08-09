const Product = require('../models/product.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = catchAsync(async (req, res, next) => {
  let products = await Product.find();
  res.status(201).json({
    status: 'success',
    data: {
      data: products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  let doc = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    return next(new AppError('No document found!', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: product,
    },
  });
});
