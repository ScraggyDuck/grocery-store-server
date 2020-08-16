const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A category must have a title'],
  },
  children: {
    type: [
      {
        title: String,
        slug: String,
      },
    ],
    default: null,
  },
  icon: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
