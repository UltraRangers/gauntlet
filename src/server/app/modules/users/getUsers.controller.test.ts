import express = require('express');
import request = require('supertest');

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { setupNestApplication } from '../../../setup';
import { UsersModule } from './users.module';

describe('GetUsersController', () => {
  let expressApplication: express.Application;
  let nestApplication: INestApplication;
  let server: request.SuperTest<any>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ UsersModule ]
    }).compile();

    // create application instance
    expressApplication = express();
    server = request(expressApplication);
    nestApplication = await module.createNestApplication(expressApplication);

    // setup application
    // setupExpressApplication(expressApplication);
    setupNestApplication(nestApplication);

    // get application services

    // initialize app
    await nestApplication.init();
  });

  it('should return 200 /api/users', () => {
    return server.get('/api/users').expect(200);
  });
});
