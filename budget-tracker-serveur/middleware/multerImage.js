const multer = require('multer');

// Dictionnaire des types MIME pour les images
const IMAGE_MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

// Configuration du stockage pour les images
const imageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = IMAGE_MIME_TYPES[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + extension);
  }
});

// Exporter multer configuré pour gérer les images
exports.uploadImage = multer({ storage: imageStorage }).single('image');
