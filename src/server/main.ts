import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { resolve } from 'path';

import express = require('express');

import { AppModule } from './app/app.module';

export async function createNestApplication() {
  const expressApp = express();
  const mainModule = AppModule;
  const nestApp = await NestFactory.create(mainModule, expressApp, {});
  applyNestApplicationSettings(nestApp);
  return {
    nestApp,
    expressApp };
}

/**
 * Sets nest application settings which can be use for testing environment too.
 * @param nestApplication - Nest Application
 */
export function applyNestApplicationSettings(nestApplication: INestApplication) {
  nestApplication.setGlobalPrefix('api');
}

function setupClient(expressApp: express.Application) {
  expressApp.use(express.static(resolve(__dirname, '../../dist/client')));
  expressApp.get('*', (request: express.Request, response: express.Response) => {
    if (request.path.match(/\.(html|css|png|jpg|ttf|js|ico)$/)) {
      return response.status(404)
        .send('Not found');
    }
    response.sendFile(resolve(__dirname, '../../dist/client/index.html'));
  });
}

async function start() {
  const port = process.env.PORT || 3000;
  const app = await createNestApplication();
  setupClient(app.expressApp);
  await app.nestApp.listen(port, () => { console.log(`server listening at http://localhost:${port}`); });
}

start();
