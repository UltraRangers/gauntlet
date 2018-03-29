import { Module } from '@nestjs/common';

import { databaseProviders } from './providers/database.provider';
import { DatabaseService } from './services/database.service';

@Module({
  components: [
    ...databaseProviders,
    DatabaseService
  ],
  exports: [
    ...databaseProviders,
    DatabaseService
  ]
})

export class DatabaseModule {}
