import { Connection } from 'typeorm';

import { ProviderTokens } from '../../common';
import { UserRepository } from './user.repository';

export const UserProvider = {
  provide: ProviderTokens.USER_CONNECTION,
  useFactory: (connection: Connection) => connection.getCustomRepository(UserRepository),
  inject: [ ProviderTokens.ROOT_CONNECTION ]
};
