import { NextFunction, Request, Response } from 'express';
import { join } from 'path';

const version = require(join(process.cwd(), 'package.json')).version;

export const versionMiddleware = (request: Request, response: Response, next: NextFunction) => {
  console.log(version);
  response.set('X-Version', version);
  next();
};
