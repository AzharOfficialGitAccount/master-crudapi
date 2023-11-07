const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { connections } = require('./app/config/database');
const { errorHandler } = require('./app/middleware');

const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/user', require('./app/routes/index'));

app.use(errorHandler.methodNotAllowed);
app.use(errorHandler.genericErrorHandler);

const httpServer = http
  .createServer(app)
  .listen(process.env.PORT, () => {
    console.info(`Server up successfully - port: ${process.env.PORT}`);
  });

process.on('unhandledRejection', (err) => {
  console.error('possibly unhandled rejection happened');
  console.error(err.message);
});

const closeHandler = () => {
  Object.values(connections).forEach((connection) => connection.close());
  httpServer.close(() => {
    console.info('Server is stopped successfully');
    process.exit(0);
  });
};
process.on('SIGTERM', closeHandler);
process.on('SIGINT', closeHandler);
