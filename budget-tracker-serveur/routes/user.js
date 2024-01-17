const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// router.post('/user', userCtrl.createUser);



router.post('/register',userCtrl.register);
router.post('/login',userCtrl.login);




module.exports = router;