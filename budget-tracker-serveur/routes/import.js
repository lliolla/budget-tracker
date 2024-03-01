 const express = require('express');
 const router = express.Router();
 const importController = require('../controllers/import');
//  const multerMiddleware = require('../middleware/multerExcel');

 // Route pour importer un fichier
 router.post('/import', importController.importTransactions);

 module.exports = router;