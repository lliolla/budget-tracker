const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const transactionSchema = mongoose.Schema(
  {
    categoryId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category', 
      required: true 
    },
    subcategoryId:
     { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Subcategory', 
      required: true 
    },
    userId:
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', required: true 
    },
    seller: { 
      type: String 
    },
  date:{type: Date,
    required: true ,
    default: Date.now
  },

 comment: { type: String, required: true },
  
    amount: {
      type: mongoose. Decimal128,
      required: true
    } ,
    type: {
      type: String,
      enum: ['recette', 'depense'],
      required: true
    },

  }
);

transactionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Transaction', transactionSchema);