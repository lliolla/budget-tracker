const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const transactionSchema = mongoose.Schema(
  {
    categoryId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category', 
     
    },
    subcategoryId:
     { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Subcategory', 
     
    },
    userId:
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
    },
    seller: { 
      type: String 
    },
  date:{type: Date,
    // required: true ,
    default: Date.now
  },

 description: { type: String,  },
  
    montant: {
      type: mongoose. Decimal128,
      
    } ,
    type: {
      type: String,
      enum: ['recette', 'depense'],
      
    },

  }
);

transactionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Transaction', transactionSchema);