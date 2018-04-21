import { Module } from '@nestjs/common';

import { BcryptService } from './services/bcrypt.service';
import { EmailService } from './services/email.service';
import { JsonWebTokenService } from './services/jsonwebtoken.service';

@Module({
  components: [
    BcryptService,
    JsonWebTokenService,
    EmailService
  ],
  exports: [
    BcryptService,
    JsonWebTokenService,
    EmailService
  ]
})
export class CoreModule {}
