const express = require('express');
const router = express.Router();
const importController = require('../controllers/import');

// Route pour importer un fichier
router.post('/import', importController.importFile);

module.exports = router;
