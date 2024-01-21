const express = require('express');
const router = express.Router();

const categoryCtrl = require('../controllers/category');

router.get('/category',categoryCtrl.getAllCategory);
router.get('/category/:id',categoryCtrl.getOneCategory);
router.post('/category',categoryCtrl.createCategory);
router.put('/category/:id',categoryCtrl.updateCategory);
router.delete('/category/:id',categoryCtrl.deleteCategory);





module.exports = router;
