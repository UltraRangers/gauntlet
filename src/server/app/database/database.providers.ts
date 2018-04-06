import { Connection, createConnection, getMetadataArgsStorage } from 'typeorm';
import { EntityRepositoryMetadataArgs } from 'typeorm/metadata-args/EntityRepositoryMetadataArgs';

import { ProviderTokens } from '../../../common';

/**
 * Todo: Load repositories in a nice way
 */
import '../roles';
import '../users';

export const databaseProviders = getDatabaseProviders();

function getDatabaseProviders() {
  const rootConnectionProvider = getRootConnectionProvider();
  const entityRepositoriesProviders = getMetadataArgsStorage().entityRepositories.map(createEntityRepositoryProviders);
  const databaseProviders = [rootConnectionProvider, ...entityRepositoriesProviders];
  return databaseProviders;
}

function createEntityRepositoryProviders(entityRepository: EntityRepositoryMetadataArgs) {
  return {
    provide: entityRepository.target,
    useFactory: (connection: Connection) => connection.getCustomRepository(entityRepository.target),
    inject: [ ProviderTokens.ROOT_CONNECTION ]
  };
}

function getRootConnectionProvider() {
  return {
    provide: ProviderTokens.ROOT_CONNECTION,
    useFactory: async () => await createConnection()
  };
}
