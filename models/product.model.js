const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A product must have a title'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  discountInPercent: {
    type: Number,
    validate: {
      validator: function (val) {
        // this only points to current doc on NEW document creation
        return val <= 100 && val >= 0;
      },
      message: 'Discount percent ({VALUE}) should be <= 0 and >= 1',
    },
  },
  description: {
    type: String,
    trim: true,
  },
  gallery: [String],
  image: {
    type: String,
  },
  categories: [String],
  slug: {
    type: String,
  },
  unit: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
