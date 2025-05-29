const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const ErrorHandler = require('./middlewares/ErrorHandler');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '../frontend')));
    this.app.use(require('./middlewares/RequestLogger').logRequest);
  }

  initializeRoutes() {
    this.app.use('/', apiRoutes);
  }

  initializeErrorHandling() {
    this.app.use(ErrorHandler.handle);
  }

  start() {
    this.app.listen(this.port, '0.0.0.0', () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const server = new Server();
server.start();