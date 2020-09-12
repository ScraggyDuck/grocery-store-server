const mongoose = require('mongoose');
const Product = require('./product.model');

const orderSchema = new mongoose.Schema({
  deliveryAddress: {
    type: String,
    required: [true, "Please provide us with the consignee's address"],
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Order must belong to a product!'],
      },
      quantity: {
        type: Number,
        required: [true, 'Please tell us quantity of product'],
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a User!'],
  },
  amount: {
    type: Number,
    require: [true, 'Order must have a amount.'],
  },
  subTotal: {
    type: Number,
    require: [true, 'Order must have a sub total.'],
  },
  deliveryFee: {
    type: Number,
    require: [true, 'Order must have a delivery fee.'],
  },
  deliveryTime: {
    type: Date,
  },
  discount: {
    type: Number,
    validate: {
      validator: function (val) {
        // this only points to current doc on NEW document creation
        return val <= 100 && val >= 0;
      },
      message: 'Discount percent ({VALUE}) should be <= 0 and >= 100',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    default: 1,
  },
});

orderSchema.pre('save', async function (next) {
  let amount = 0;
  let subTotal = 0;
  await this.products.forEach(async (item, index) => {
    const product = await Product.findById(item.productId);
    if (product) {
      const { price, discountInPercent } = product;
      subTotal += (price - (price * discountInPercent) / 100) * item.quantity;
      if (index === this.products.length - 1) {
        subTotal = subTotal - (subTotal * this.discount) / 100;
        amount = subTotal + this.deliveryFee;
        // this.subTotal = subTotal;
        // this.amount = amount;
      }
    }
  });

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
