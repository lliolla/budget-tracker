const express = require('express');
const router = express.Router();

const transactionCtrl = require('../controllers/transactions');

router.get('/transaction',transactionCtrl.getAllTransaction);
router.get('/transaction/:id',transactionCtrl.getOneTransaction);
router.post('/transaction',transactionCtrl.createTransaction);
router.put('/transaction/:id',transactionCtrl.updateTransaction);
router.delete('/transaction/:id',transactionCtrl.deleteTransaction);

router.post('/transaction/import',transactionCtrl.integrateTransactions);





module.exports = router;
