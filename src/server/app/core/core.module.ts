import { Module } from '@nestjs/common';

import { BcryptService } from './services/bcrypt.service';
import { JsonWebTokenService } from './services/jsonwebtoken.service';

@Module({
  components: [
    BcryptService,
    JsonWebTokenService
  ],
  exports: [
    BcryptService,
    JsonWebTokenService
  ]
})
export class CoreModule {}
