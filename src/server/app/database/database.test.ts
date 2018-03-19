import express = require('express');

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { DatabaseModule } from './database.module';
import { DatabaseService } from './database.service';

describe('unit test: database service', () => {
  const server = express();
  let app: INestApplication;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ DatabaseModule ]
    }).compile();

    app = await module.createNestApplication(server);
    databaseService = app.select(DatabaseModule).get(DatabaseService);
    await app.init();
  });

  afterAll(async () => {
    await databaseService.disconnect();
  });

  it('should disconnect from database', async () => {
    await databaseService.disconnect();
  });

  it('should connect from database', async () => {
    await databaseService.connect();
  });

  it('should reset database', async () => {
    await databaseService.reset();
  });

  it('should seed database', async () => {
    await databaseService.seed();
  });
});
