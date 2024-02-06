const express = require('express');
const router = express.Router();
const frontController = require('../controllers/frontController');

router.get('/v2/:onomoid', frontController.v2pedal_get);
router.get('/v1/:onomoid', frontController.v1pedal_get);

module.exports = router;