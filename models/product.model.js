const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  percentDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        // this only points to current doc on NEW document creation
        return val <= 1 && val >= 0;
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
