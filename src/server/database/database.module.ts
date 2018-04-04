import { Module } from '@nestjs/common';
import { createConnection } from 'typeorm';

import { ProviderTokens } from '../../common';
import { RoleProvider } from '../roles/role.provider';
import { UserProvider } from '../users/user.provider';
import { DatabaseService } from './database.service';

const databaseProviders = [
  {
    provide: ProviderTokens.ROOT_CONNECTION,
    useFactory: async () => await createConnection()
  }, RoleProvider, UserProvider
];

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
