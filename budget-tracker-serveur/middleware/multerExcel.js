const multer = require('multer');

const MIME_TYPES = {
  'application/vnd.ms-excel': 'xlsx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'text/csv': 'csv'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const date = new Date().toISOString().slice(0, 10); // Obtenez la date du jour au format YYYY-MM-DD
    const uniqueSuffix = Math.floor(Math.random() * 900000) + 100000; // Numéro unique à 6 chiffres
    const extension = MIME_TYPES[file.mimetype]; // Obtenez l'extension du fichier en fonction de son type MIME
    const filename = `import-${date}-${uniqueSuffix}.${extension}`; // Format du nom de fichier
    callback(null, filename);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, callback) => {
    if (MIME_TYPES[file.mimetype]) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type'));
    }
  }
}).single('file');

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Multer error', message: err.message });
    } else if (err) {
      return res.status(400).json({ error: 'Unknown error', message: err.message });
    }
    if (!req.file || !req.file.mimetype) {
      return res.status(400).json({ error: 'Missing mimetype', message: 'Mimetype is undefined' });
    }
    next();
  });
};
