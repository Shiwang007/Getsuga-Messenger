const express = require('express');
const userController = require('../controllers/user.controller');
const protected = require('../middleware/protectedRoute');

const router = express.Router();

router.get('/', protected, userController.allUsers);

module.exports = router