const xlsx = require('xlsx');
const csv = require('csv-parser');
const fs = require('fs');

// Middleware pour gérer l'upload de fichiers
const upload = require('../middleware/multerExcel');

// Fonction de contrôleur pour importer un fichier
exports.importFile = (req, res) => {
  // Utilisation du middleware de téléchargement de fichiers
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Upload failed', error: err.message });
    }

    try {
      let data;
      // Vérifier le type de fichier uploadé
      if (req.file.mimetype === 'text/csv') {
        // Si c'est un fichier CSV
        data = await processCSV(req.file.path);
      } else if (req.file.mimetype === 'application/vnd.ms-excel') {
        // Si c'est un fichier Excel
        data = await processExcel(req.file.path);
      } else {
        // Si le type de fichier n'est ni CSV ni Excel
        fs.unlinkSync(req.file.path); // Supprimer le fichier uploadé
        return res.status(400).json({ message: 'Unsupported file format' });
      }

      // Déplacer le fichier vers le dossier "uploads"
      const newPath = `uploads/${req.file.filename}`;
      fs.renameSync(req.file.path, newPath);

      res.status(200).json({ message: 'File uploaded and processed successfully', data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

// Fonction pour traiter un fichier CSV
const processCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Ajouter chaque ligne de données
        data.push(row);
      })
      .on('end', () => {
        // Renvoyer les données une fois le traitement terminé
        resolve(data);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Fonction pour traiter un fichier Excel
const processExcel = (filePath) => {
  return new Promise((resolve, reject) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet, { raw: true });
    resolve(data);
  });
};
