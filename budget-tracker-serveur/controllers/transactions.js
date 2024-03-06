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
       Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            );
        res.json({ message: 'Tansaction modifiée avec succès'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }; 
const Transaction = require('../models/Transaction');

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
  exports.deleteAllTransaction = async (req, res) => {
    try {
        await Transaction.deleteMany();
        res.json({ message: "Toutes les transactions ont été supprimées" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  exports.updateTransaction = async (req, res) => {
    try {
      if (!Array.isArray(data)) {
        throw new Error('Data must be an array of objects');
      }
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
