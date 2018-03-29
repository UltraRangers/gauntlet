import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import express = require('express');

import { AppModule } from './app.module';

export async function createNestApplication() {
  const expressApp = express();
  const mainModule = AppModule;
  const nestApp = await NestFactory.create(mainModule, expressApp, {});
  applyNestApplicationSettings(nestApp);
  return {
    nestApp,
    expressApp
  };
}

/**
 * Sets nest application settings which can be use for testing environment too.
 * @param nestApplication - Nest Application
 */
export function applyNestApplicationSettings(nestApplication: INestApplication) {
  nestApplication.setGlobalPrefix('api');
}
