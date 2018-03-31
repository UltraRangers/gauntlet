import express = require('express');
import request = require('supertest');

import { Test } from '@nestjs/testing';

import { setupNestApplication } from '../setup';
import { UserModule } from './user.module';

describe('GetUsersController', () => {
  const server = express();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ UserModule ]
    }).compile();

    const app = await module.createNestApplication(server);
    setupNestApplication(app);
    await app.init();
  });

  it('should return 200 /api/users', () => {
    return request(server)
      .get('/api/users')
      .expect(200);
  });
});
