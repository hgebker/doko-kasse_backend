import createError from 'http-errors';
import { ErrorRequestHandler, RequestHandler } from 'express';

const appHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log('ERROR:');
  console.log(err);
  console.log(err.message);

  res.status(err.status || 500);
};

const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(createError(404));
};

export { appHandler, notFoundHandler };
export default appHandler;
