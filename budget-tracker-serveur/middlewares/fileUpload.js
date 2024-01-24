const multerMiddleware = require('./multer');
const express = require('express');
const router = express.Router();
const excel = require('exceljs');
const Transaction = require('../models/transaction');

router.post('/upload/excel', multerMiddleware.single('excel'), async (req, res) => {
  const filePath = req.file.buffer;

  try {
    const workbook = new excel.Workbook();
    await workbook.xlsx.load(filePath);

    const sheet = workbook.getWorksheet(1);
    const transactions = [];

    // Mappez les colonnes de l'Excel aux champs MongoDB
    sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) {
        const transaction = {
          userId: req.body.userId, // bien passer userId depuis la requête
          type: row.getCell(1).value,
          amount: row.getCell(2).value,
          date: row.getCell(3).value,
          category: row.getCell(4).value,
          subcategory: row.getCell(5).value,
          comment: row.getCell(6).value,
          // Modifier les champs en fonction des comones excel
        };
 // Vérifiez s'il existe déjà une transaction avec la même date et la même description
 Transaction.findOne({
  userId: req.body.userId,
  date: transactionData.date,
  comment: transactionData.comment,
}).then(existingTransaction => {
  // Si aucune transaction existante, ajoutez cette transaction à la liste
  if (!existingTransaction) {
    transactions.push(transactionData);
  }
});
}
});

    // Enregistrez les transactions dans la base de données
    await Transaction.insertMany(transactions);

    res.json({ message: 'Fichier Excel téléchargé et transactions ajoutées avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
