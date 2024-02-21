const Transaction = require('../models/transaction');

exports.getAllTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find()
    .populate({
      path: 'categoryId',
      model: 'Category',
      select: 'title',
    })
    .populate({
      path: 'subcategoryId',
      model: 'Subcategory',
      select: 'title',
    })
    .exec();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOneTransaction = async (req, res) => {
    try {
      const transactions = await Transaction.find()
      .populate({
        path: 'categoryId',
        model: 'Category',
        select: 'title',
      })
      .populate({
        path: 'subcategoryId',
        model: 'Subcategory',
        select: 'title',
      })
      .exec();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 

exports.createTransaction = async (req, res) => {
  const { categoryId, subcategoryId, userId, type, seller, date, comment, amount } = req.body;

  try {
    const newTransaction = new Transaction({
        categoryId, 
        subcategoryId, 
        userId, 
        type, 
        seller, 
        date, 
        comment, 
        amount,
    });

   await newTransaction.save();
    res.status(201).json({message :"Transaction creée"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteTransaction = async (req, res) => {
    try {
         await Transaction.findByIdAndDelete(req.params.id);
        res.json({message:"Transaction supprimée"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 
  exports.updateTransaction = async (req, res) => {
    try {
         await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            );
        res.json({message :"Transaction modifiée"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 