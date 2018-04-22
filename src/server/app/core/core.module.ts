import { Module } from '@nestjs/common';

import { BcryptService } from './services/bcrypt.service';
import { ConfigService } from './services/config.service';
import { EmailService } from './services/email.service';
import { JsonWebTokenService } from './services/jsonwebtoken.service';

@Module({
  components: [
    BcryptService,
    JsonWebTokenService,
    EmailService,
    ConfigService
  ],
  exports: [
    BcryptService,
    JsonWebTokenService,
    EmailService,
    ConfigService
  ]
})
export class CoreModule {}
