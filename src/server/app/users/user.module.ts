import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { GetUsersController } from './getUsers.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    GetUsersController
  ],
  components: [
    UserService
  ]
})
export class UserModule {}
