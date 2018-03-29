import { Module } from '@nestjs/common';

import { UsersModule } from './controllers/users/users.module';

@Module({
  imports: [],
  modules: [
    UsersModule
  ],
  components: []
})
export class AppModule {}
