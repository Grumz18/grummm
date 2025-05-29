const path = require('path');

class StaticFileController {
  static serveFrontend(req, res) {
    res.sendFile(path.join(__dirname, '../../frontend', 'index.html'));
  }

  static apiTest(req, res) {
    res.json({ message: 'Hello from Express server!' });
  }
}

module.exports = StaticFileController;