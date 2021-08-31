import { RequestHandler } from 'express';

const localsHandler: RequestHandler = (req, res, next) => {
  res.locals.eveningsTable = req.apiGateway.event.stageVariables.eveningsTable || 'evenings-dev';
  res.locals.expensesTable = req.apiGateway.event.stageVariables.expensesTable || 'expenses-dev';
  res.locals.earningsTable = req.apiGateway.event.stageVariables.earningsTable || 'earnings-dev';

  next();
};

export default localsHandler;
