import { INestApplication } from '@nestjs/common';
import { Application } from 'express';

/**
 * Nest.js doesn't provide a way to get the express app instance
 */
export interface INestApplicationWithExpress {
  nestApp: INestApplication
  expressApp: Application;
}