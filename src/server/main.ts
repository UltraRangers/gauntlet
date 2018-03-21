import { NestFactory } from '@nestjs/core';

import express = require('express');

import { AppModule } from './app/app.module';
import { setupExpressApplication, setupNestApplication } from './setup';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  // create application instance
  const expressApplication = express();
  const nestApplication = await NestFactory.create(AppModule, expressApplication, {});

  // setup the application
  setupExpressApplication(expressApplication);
  setupNestApplication(nestApplication);

  await nestApplication.init();
  await nestApplication.listen(port);
  console.log(`server listening at http://localhost:${port}`);
}

bootstrap();
