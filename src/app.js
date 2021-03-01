const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const AWS = require('aws-sdk');
const cors = require('cors');

AWS.config.update({ region: 'eu-central-1' });

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(cors());

app.use((req, res, next) => {
  console.log('REQUEST:');

  req.eveningsTable = req.apiGateway.event.stageVariables.eveningsTable || 'evenings-dev';
  req.expensesTable = req.apiGateway.event.stageVariables.expensesTable || 'expenses-dev';

  next();
});

app.use('/evenings', require('./routes/evenings'));
app.use('/reports', require('./routes/reports'));
app.use('/expenses', require('./routes/expenses'));

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.log('ERROR:');
  console.log(err);
  console.log(err.message);

  res.status(err.status || 500);
});

module.exports = app;
