const Transaction = require('../models/transaction');



exports.getAllTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOneTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        res.json(transaction);
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
        amount
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 
  exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            );
        res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 