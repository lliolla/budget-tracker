const express = require('express');
const router = express.Router();

const subcategoryCtrl = require('../controllers/subCategory');

router.get('/subcategory',subcategoryCtrl.getAllSubCategory);
router.get('/subcategory/:id',subcategoryCtrl.getOneSubCategory);
router.post('/subcategory',subcategoryCtrl.createSubCategory);
router.put('/subcategory/:id',subcategoryCtrl.updateSubCategory);
router.delete('/subcategory/:id',subcategoryCtrl.deleteSubCategory);





module.exports = router;
