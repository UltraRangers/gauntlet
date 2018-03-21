import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { DatabaseModule } from './database.module';
import { DatabaseService } from './database.service';

describe('unit test: database service', () => {
  let nestApplication: INestApplication;
  let databaseService: DatabaseService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ DatabaseModule ]
    }).compile();

    // create application instance
    nestApplication = await module.createNestApplication();

    // get application services
    databaseService = nestApplication.select(DatabaseModule).get(DatabaseService);

    // initialize app
    await nestApplication.init();
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
