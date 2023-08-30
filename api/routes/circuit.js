const express = require('express');
const router = express.Router();

const CircuitController = require('../controllers/circuit');

router.get('/generate', CircuitController.generate);

module.exports = router;