const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const importedFileSchema = new Schema({
  originalName: String, // Nom original du fichier
  fileName: String, // Nom du fichier enregistré sur le serveur
  filePath: String, // Chemin complet du fichier sur le serveur
  fileType: String, // Type de fichier (par exemple, CSV, Excel, etc.)
  uploadedAt: { type: Date, default: Date.now } // Date de téléchargement du fichier
});

const ImportedFile = mongoose.model('ImportedFile', importedFileSchema);

module.exports = ImportedFile;
