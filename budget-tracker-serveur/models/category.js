const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true 
  },
  budget:{ type: Number, required: true, default:0 },
  title:{type: String,required: true }
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', categorySchema);