import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';

import { CoreModule } from '../core.module';
import { ConfigService } from './config.service';

describe('unit test: Config Service', () => {
  let nestApplication: INestApplication;
  let configService: ConfigService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule]
    }).compile();

    // create application instance
    nestApplication = await module.createNestApplication();

    // get application services
    configService = nestApplication.select(CoreModule).get(ConfigService);

    // initialize app
    await nestApplication.init();
  });

  describe('getEmailConfig', () => {
    it('should get email config', () => {
      const emailConfig = configService.getEmailConfig();
      expect(emailConfig).to.be.an('object');
      expect(emailConfig).to.have.property('auth');
      expect(emailConfig).to.have.property('service', 'gmail');
    });
  });

});
