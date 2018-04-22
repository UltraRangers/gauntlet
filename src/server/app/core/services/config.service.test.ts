import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { CoreModule } from '../core.module';
import { ConfigService } from './config.service';

describe('unit test: Config Service', () => {
  let nestApplication: INestApplication;
  let configService: ConfigService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ CoreModule ]
    }).compile();

    // create application instance
    nestApplication = await module.createNestApplication();

    // get application services
    configService = nestApplication.select(CoreModule).get(ConfigService);

    // initialize app
    await nestApplication.init();
  });

  it('should get ormconfig with exact path', () => {
    const config = configService.getConfig('ormconfig.development.json');
    expect(Object.keys(config).length).toBeGreaterThan(1);
  });

  it('should get ormconfig without specifiying the environment', () => {
    const config = configService.getConfig('ormconfig');
    expect(Object.keys(config).length).toBeGreaterThan(1);
  });

  it('should throw an error for a non existing file', () => {
    expect(() => configService.getConfig('non-existing-file')).toThrow();
  });
});
