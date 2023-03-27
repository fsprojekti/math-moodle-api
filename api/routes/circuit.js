const express = require('express');
const router = express.Router();

const CircuitController = require('../controllers/circuit');

router.get('/get', CircuitController.get);

module.exports = router;