import express = require('express');
import request = require('supertest');

import { Test } from '@nestjs/testing';

import { setupNestApplication } from '../setup';
import { UserModule } from './user.module';

import { DatabaseService } from '../common/database.service';
import { DatabaseModule } from '../database.module';

describe('GetUsersController', () => {
  const server = express();
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ UserModule ]
    }).compile();

    const app = await module.createNestApplication(server);
    databaseService = app.select(DatabaseModule).get(DatabaseService);

    setupNestApplication(app);
    await app.init();
  });

  afterAll(async () => {
    await databaseService.disconnect();
  });

  it('should return 200 /api/users', () => {
    return request(server)
      .get('/api/users')
      .expect(200);
  });
});
