const QRCodeService = require('../services/QRCodeService');
const ExpirationCalculator = require('../services/ExpirationCalculator');

class QRCodeController {
  static async generate(req, res, next) {
    try {
      const { url, isTransparent, expiration } = req.body;

      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      const { qrCode, format } = await QRCodeService.generateQRCode(url, isTransparent);
      const expiresAt = ExpirationCalculator.calculateExpiration(expiration);

      res.json({ qrCode, format, expiresAt });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = QRCodeController;