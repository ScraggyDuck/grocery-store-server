const Product = require('../models/product.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = catchAsync(async (req, res, next) => {
  const { limit, category, keyword } = req.query;
  //Tim tat cac cac san pham co chua keyword
  let regex = new RegExp(keyword, 'i');
  if (limit) {
    let products = [];
    if (!category && !keyword) {
      products = await Product.find().limit(parseInt(limit));
    } else {
      let filter = category
        ? { categories: [category], name: regex }
        : { name: regex };
      products = await Product.find(filter).limit(parseInt(limit));
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
