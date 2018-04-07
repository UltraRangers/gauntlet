import { Module } from '@nestjs/common';

import { DatabaseProviders } from './database.providers';
import { DatabaseService } from './database.service';

@Module({
  components: [
    ...DatabaseProviders.getDatabaseProviders(),
    DatabaseService
  ],
  exports: [
    ...DatabaseProviders.getDatabaseProviders(),
    DatabaseService
  ]
})

export class DatabaseModule {}
