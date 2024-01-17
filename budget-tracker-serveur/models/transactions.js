const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const transactionSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  catId: { type: String, required: true },
});

transactionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Transaction', transactionSchema);