const awsServerlessExpressMiddleware = require('aws-serverless-express');
const app = require('./app');

const server = awsServerlessExpressMiddleware.createServer(app);

exports.handler = (event, context) => awsServerlessExpressMiddleware.proxy(server, event, context);
