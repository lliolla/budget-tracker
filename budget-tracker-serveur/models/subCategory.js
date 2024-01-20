const mongoose = require('mongoose');


const subCategorySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true },
  budget:{ 
    type: Number, 
    default:0 },
  name:{
    type: String,
    required: true }
});

subCategorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('subCategory', subCategorySchema);
