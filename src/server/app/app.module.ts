import { Module } from '@nestjs/common';

import { UsersModule } from './modules';

@Module({
  imports: [],
  modules: [
    UsersModule
  ],
  components: []
})
export class AppModule {}
