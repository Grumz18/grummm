const express = require('express');
const router = express.Router();
const StaticFileController = require('../controllers/StaticFileController');
const QRCodeController = require('../controllers/QRCodeController');

router.get('/', StaticFileController.serveFrontend);
router.get('/api', StaticFileController.apiTest);
router.post('/api/generate-qr', QRCodeController.generate);

module.exports = router;