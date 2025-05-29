class ErrorHandler {
    static handle(err, req, res, next) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = ErrorHandler;