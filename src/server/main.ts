import { NestFactory } from '@nestjs/core';
import { Application, Request, Response } from 'express';
import { resolve } from 'path';

import express = require('express');

import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = 3000 || process.env.NODE_PORT;
  const expressApp = express();
  const app = await NestFactory.create(AppModule, expressApp, {});
  setupClient(expressApp);
  await app.init();
  await app.listen(port);
  console.log(`server listening at http://localhost:${port}`);
}

function setupClient(expressApp: Application) {
  expressApp.use(express.static(resolve(__dirname, '../../dist/client')));
  expressApp.get('*', (request: Request, response: Response) => {
    if (request.path.match(/\.(html|css|png|jpg|ttf|js|ico)$/)) {
      response.status(404).send('Not found');
    }
    response.sendFile(resolve(__dirname, '../../dist/client/index.html'));
  });
}

bootstrap();
