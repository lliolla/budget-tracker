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
// Fonction pour mapper les objets et les intégrer à la base de données
exports.integrateTransactions = async (data) => {
  try {
    // Parcourez chaque objet dans les données
    for (const item of data) {
      // Extrait les informations nécessaires pour créer un document de transaction
      const { NuméroCompte, seller, date, comment, amount } = item;

      // Créez une instance de modèle de transaction avec ces informations
      const transaction = new Transaction({
        categoryId: '65d627c16bb89832861bceaa', // Remplacez par l'ID de la catégorie appropriée
        subcategoryId: '65d627f76bb89832861bceae', // Remplacez par l'ID de la sous-catégorie appropriée
        userId: transaction.userId, // Remplacez par l'ID de l'utilisateur approprié
        seller: seller,
        date: new Date(date),
        comment: comment,
        amount: amount,
        type: amount >= 0 ? 'recette' : 'depense', // Déterminez le type de transaction en fonction du montant
        fileUrl: '' // Vous pouvez ajouter le chemin du fichier image ici si nécessaire
      });

      // Enregistrez cette instance dans la base de données
      await transaction.save();
    }

    console.log('Transactions integrated successfully');
  } catch (error) {
    console.error('Error integrating transactions:', error);
  }
};