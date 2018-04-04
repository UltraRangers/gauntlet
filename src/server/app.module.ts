import { Module } from '@nestjs/common';

import { UserModule } from './users';

@Module({
  imports: [
    UserModule
  ],
  components: []
})
export class AppModule {}
