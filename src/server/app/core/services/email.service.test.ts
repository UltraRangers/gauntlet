import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { stub } from 'sinon';
import { CoreModule } from '../core.module';
import { EmailService } from './email.service';

describe('unit test: Email Service', () => {
  let nestApplication: INestApplication;
  let emailService: EmailService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ CoreModule ]
    }).compile();

    // create application instance
    nestApplication = await module.createNestApplication();

    // get application services
    emailService = nestApplication.select(CoreModule).get(EmailService);

    // initialize app
    await nestApplication.init();
  });

  it('should send email', () => {
    const sinon = stub(emailService, 'sendMail').callsFake(() => {}).returns('ok');
    expect(sinon()).toEqual('ok');
    sinon.restore();
  });
});
