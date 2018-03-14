import { Module } from '@nestjs/common';

import { GetUsersController } from './getUsers.controller';

@Module({
  controllers: [
    GetUsersController
  ]
})

export class UsersModule {}
