import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import AWS from 'aws-sdk';
import cors from 'cors';

import { appHandler, notFoundHandler } from './modules/middleware/errorHandler';
import localsHandler from './modules/middleware/localsHandler';

import eveningsRouter from './routes/evenings';
import reportsRouter from './routes/reports';
import expensesRouter from './routes/expenses';

AWS.config.update({ region: 'eu-central-1' });

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(cors());
app.use(localsHandler);

app.use('/evenings', eveningsRouter);
app.use('/reports', reportsRouter);
app.use('/expenses', expensesRouter);

app.use(notFoundHandler);
app.use(appHandler);

export default app;
