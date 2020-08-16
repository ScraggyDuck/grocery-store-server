const Product = require('../models/product.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = catchAsync(async (req, res, next) => {
  const { limit, category, keyword, offset } = req.query;
  //Find all products contain keyword
  let regex = new RegExp(keyword, 'i');
  if (limit && offset) {
    let products = [];
    if (!category && !keyword) {
      products = await Product.find()
        .limit(parseInt(limit))
        .skip(parseInt(offset));
    } else {
      let filter = category
        ? { categories: { $all: [category] }, title: regex }
        : { title: regex };
      products = await Product.find(filter)
        .limit(parseInt(limit))
        .skip(parseInt(offset));
    }
    res.status(201).json({
      status: 'success',
      data: {
        data: products,
      },
    });
  } else {
    return next(new AppError('Can not get products!', 404));
  }
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
