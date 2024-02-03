const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true },
  name:{type: String,required: true },
  imageUrl: { type: String},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);