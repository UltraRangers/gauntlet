import { Module } from '@nestjs/common';

import { UserModule } from './app/users';

@Module({
  imports: [
    UserModule
  ],
  components: []
})
export class AppModule {}
