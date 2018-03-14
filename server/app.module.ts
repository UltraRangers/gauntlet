import { Module } from '@nestjs/common';

import { UsersModule } from './modules';

@Module({
  imports: [ UsersModule ]
})

export class AppModule {}
