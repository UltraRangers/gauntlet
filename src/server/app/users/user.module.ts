import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
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
