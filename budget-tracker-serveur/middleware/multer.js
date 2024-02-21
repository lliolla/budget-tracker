const multer = require('multer');
const xlsx = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');
const Transaction = require('../models/transaction');

// Dictionnaire des types MIME pour les extensions de fichiers
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'application/vnd.ms-excel': 'xls',
  'text/csv': 'csv'
};

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
      callback(null, 'images'); // Dossier où les images seront stockées
    } else {
      callback(null, 'uploads'); // Dossier où les fichiers autres que les images seront stockés
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + '_' + Date.now() + '.' + extension);
  }
});

// Middleware pour gérer l'upload de fichiers
const upload = multer({ storage }).single('file');

// Fonction de contrôleur pour créer une transaction avec gestion de fichier
exports.createTransaction = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Upload failed', error: err.message });
    }

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
        file: req.file ? req.file.filename : null // Stocker le nom du fichier dans la base de données
      });

      await newTransaction.save();
      res.status(201).json({ message: "Transaction created" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

// Autres fonctions du contrôleur de transaction...
