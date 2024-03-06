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
  
    try {
      const newTransaction = new Transaction({
          ...req.body
      });
  
      await newTransaction.save();
      res.status(201).json({ ...req.body, message: 'Transaction enregistrée avec succès' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
exports.deleteTransaction = async (req, res) => {
    try {
       await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tansaction suprimée avec succès'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 
  exports.updateTransaction = async (req, res) => {
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedTransaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.json({ message: 'Transaction modifiée avec succès', transaction: updatedTransaction });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



