import express = require('express');
import request = require('supertest');

import { Test } from '@nestjs/testing';

import { setupNestApplication } from '../../setup';
import { UserModule } from './user.module';

import { DatabaseModule, DatabaseService } from '../database';

describe('UserController', () => {
  const server = express();
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ UserModule ]
    }).compile();

    const app = await module.createNestApplication(server);
    databaseService = app.select(DatabaseModule).get(DatabaseService);

    await databaseService.reset();

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