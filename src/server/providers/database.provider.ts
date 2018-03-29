import { Connection, createConnection } from 'typeorm';

import { ProviderTokens } from '../../common/constants';
import { RoleRepository, UserRepository } from '../repositories/';

export const databaseProviders = [
  {
    provide: ProviderTokens.ROOT_CONNECTION,
    useFactory: async () => await createConnection()
  }, {
    provide: ProviderTokens.ROLE_CONNECTION,
    useFactory: (connection: Connection) => connection.getCustomRepository(RoleRepository),
    inject: [ ProviderTokens.ROOT_CONNECTION ]
  }, {
    provide: ProviderTokens.ROLE_CONNECTION,
    useFactory: (connection: Connection) => connection.getCustomRepository(UserRepository),
    inject: [ ProviderTokens.ROOT_CONNECTION ]
  }
];
