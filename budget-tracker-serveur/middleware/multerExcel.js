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
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, file.fieldname + '-' + uniqueSuffix);
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
