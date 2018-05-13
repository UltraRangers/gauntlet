import { Module } from '@nestjs/common';

import { BcryptService } from './services/bcrypt.service';
import { ConfigService } from './services/config.service';
import { EmailService } from './services/email.service';
import { JsonWebTokenService } from './services/jsonwebtoken.service';
import { PugService } from './services/pug.service';

@Module({
  components: [
    BcryptService,
    ConfigService,
    EmailService,
    JsonWebTokenService,
    PugService
  ],
  exports: [
    BcryptService,
    ConfigService,
    EmailService,
    JsonWebTokenService,
    PugService
  ]
})
export class CoreModule {}
