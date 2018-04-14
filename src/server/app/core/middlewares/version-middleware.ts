import { NextFunction, Request, Response } from 'express';

const version = require('../../../../../package.json').version;

export const versionMiddleware = (request: Request, response: Response, next: NextFunction) => {
  response.set('X-Version', version);
  next();
};
