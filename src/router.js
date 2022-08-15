const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController')

router.get('/word', mainController.getWordFromAPI)

module.exports = router;
