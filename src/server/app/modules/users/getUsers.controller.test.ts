import express = require('express');
import request = require('supertest');

import { Test } from '@nestjs/testing';

import { applyNestApplicationSettings } from '../../../setup';
import { UsersModule } from './users.module';

describe('GetUsersController', () => {
  const server = express();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ UsersModule ]
    }).compile();

    const app = await module.createNestApplication(server);
    applyNestApplicationSettings(app);
    await app.init();
  });

  it('should return 200 /api/users', () => {
    return request(server)
      .get('/api/users')
      .expect(200);
  });
});
