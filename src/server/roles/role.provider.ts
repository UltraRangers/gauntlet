import { Connection } from 'typeorm';

import { ProviderTokens } from '../../common';
import { RoleRepository } from './role.repository';

export const RoleProvider = {
  provide: ProviderTokens.ROLE_CONNECTION,
  useFactory: (connection: Connection) => connection.getCustomRepository(RoleRepository),
  inject: [ ProviderTokens.ROOT_CONNECTION ]
};
