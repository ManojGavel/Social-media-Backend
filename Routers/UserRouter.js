const express = require('express');
const router = express.Router();
const { signup } = require('../Controllers/UserController');
const {protect, login, logout} = require('../Controllers/AuthController');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').post(protect, logout);

module.exports = router;