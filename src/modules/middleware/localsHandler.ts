import { RequestHandler } from 'express';

const localsHandler: RequestHandler = (req, res, next) => {
  res.locals.eveningsTable = req.apiGateway.event.stageVariables.eveningsTable || 'evenings-dev';
  res.locals.expensesTable = req.apiGateway.event.stageVariables.expensesTable || 'expenses-dev';

  next();
};

export default localsHandler;
