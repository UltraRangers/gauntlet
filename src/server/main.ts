import { NestFactory } from '@nestjs/core';

import express = require('express');

import { AppModule } from './app/app.module';

export async function createNestApplication() {
  const expressApp = express();
  const nestApp: any = await NestFactory.create(AppModule, expressApp, {});
  nestApp.express = expressApp; // Add the express instance
  return nestApp;
}
