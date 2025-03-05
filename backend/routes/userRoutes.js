const express = require('express');
const router = express.Router();
const {createAccount,login} = require('../controllers/userController');

console.log("Routes loaded: /createAccount, /login");

router.post('/createAccount', createAccount);
router.post("/login", login); 

module.exports = router;