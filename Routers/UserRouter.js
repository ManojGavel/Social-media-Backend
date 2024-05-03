const express = require('express');
const router = express.Router();
const { signup } = require('../Controllers/UserController');
const {protect, login} = require('../Controllers/AuthController');

router.route('/signup').post(signup);
router.route('/login').post(login);

module.exports = router;