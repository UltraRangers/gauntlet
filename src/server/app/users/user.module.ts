import { Module } from '@nestjs/common';

import { CoreModule } from '../core';
import { DatabaseModule } from '../database';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    CoreModule,
    DatabaseModule
  ],
  controllers: [
    UserController
  ],
  components: [
    UserService
  ]
})
export class UserModule {}
