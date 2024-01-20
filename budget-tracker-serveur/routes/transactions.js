const express = require('express');
const router = express.Router();

const transactionCtrl = require('../controllers/transaction');





router.post('/transaction',transactionCtrl.getAllTransaction);
router.post('/transaction/id',transactionCtrl.getOneTransaction);




module.exports = router;