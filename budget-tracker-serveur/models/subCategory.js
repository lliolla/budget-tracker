const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const subCategorySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  budget: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String
  }
});

subCategorySchema.plugin(uniqueValidator);

const Subcategory = mongoose.model('Subcategory', subCategorySchema);

module.exports = Subcategory;
