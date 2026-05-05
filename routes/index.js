var express = require('express');
var router = express.Router();
const userController = require('../modules/user/userController');

router.get('/', (req, res) => {
   res.render('index');
});

router.get('/register', (req, res) => {
   res.render('register');
});
router.post('/register', userController.register);

router.get('/login', (req, res) => {
   res.render('login');
});
router.post('/login', userController.login);

module.exports = router;