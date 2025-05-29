class ExpirationCalculator {
    static calculateExpiration(expirationType) {
      const now = Date.now();
      switch (expirationType) {
        case '1day':
          return new Date(now + 1 * 24 * 60 * 60 * 1000).toISOString();
        case '7days':
          return new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString();
        case '30days':
          return new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString();
        case 'unlimited':
        default:
          return null;
      }
    }
  }
  
  module.exports = ExpirationCalculator;