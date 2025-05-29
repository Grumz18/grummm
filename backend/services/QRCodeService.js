const QRCode = require('qrcode');

class QRCodeService {
  static async generateQRCode(url, isTransparent = false) {
    const options = {
      color: {
        dark: '#000000',
        light: isTransparent ? undefined : '#FFFFFF',
      },
    };

    if (isTransparent) {
      return {
        qrCode: await QRCode.toString(url, { ...options, type: 'svg' }),
        format: 'svg'
      };
    } else {
      return {
        qrCode: await QRCode.toDataURL(url, options),
        format: 'png'
      };
    }
  }
}

module.exports = QRCodeService;