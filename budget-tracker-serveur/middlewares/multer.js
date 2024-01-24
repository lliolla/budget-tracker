const multer = require('multer');

// Définition des types MIME autorisés pour les images
const IMAGE_MIME_TYPES = 
['image/jpg', 
'image/jpeg', 
'image/png'];
// Définition des types MIME autorisés pour les fichiers Excel et CSV
const EXCEL_CSV_MIME_TYPES = 
['application/vnd.ms-excel',
 'text/csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

// Configuration du stockage pour Multer
const getMimeType = (file, mimeTypes) => {
   // Choix du dossier de destination en fonction du type de fichier
  const fileType = mimeTypes.find(type => type === file.mimetype);
  return fileType ? fileType.split('/')[1] : null;
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const destinationFolder = IMAGE_MIME_TYPES.includes(file.mimetype) ? 'avatars' : 'files';
    callback(null, destinationFolder);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = getMimeType(file, IMAGE_MIME_TYPES) || getMimeType(file, EXCEL_CSV_MIME_TYPES);
    callback(null, name + Date.now() + '.' + extension);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
