import * as express from 'express';
import * as request from 'supertest';

import { Test } from '@nestjs/testing';
import { UsersModule } from './users.module';

describe('GetUsersController', () => {
  const server = express();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ UsersModule ]
    }).compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  it('should return 200 /users', () => {
    return request(server)
      .get('/users')
      .expect(200);
  });
});
