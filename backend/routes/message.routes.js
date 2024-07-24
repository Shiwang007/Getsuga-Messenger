const express = require('express');
const messageController = require("../controllers/message.controller");
const protected = require('../middleware/protectedRoute');

const router = express.Router();

router.post('/send/:id', protected, messageController.sendMessage)
router.get('/:id', protected, messageController.getMessages)


module.exports = router