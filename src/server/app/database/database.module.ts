import { Module } from '@nestjs/common';
import { Connection, createConnection, Repository } from 'typeorm';

import { DatabaseService } from './database.service';

// Database repositories
import { RoleRepository } from './repositories/role.repository';
import { UserRepository } from './repositories/user.repository';

const databaseProviders = [{
  provide: Connection,
  useFactory: async () => await createConnection()
}, {
  provide: 'RoleRepositoryToken',
  useFactory: (connection: Connection) => connection.getCustomRepository(RoleRepository),
  inject: [Connection]
}, {
  provide: 'UserRepositoryToken',
  useFactory: (connection: Connection) => connection.getCustomRepository(UserRepository),
  inject: [Connection]
}];

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
