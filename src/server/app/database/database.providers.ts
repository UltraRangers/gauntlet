import glob = require('glob');

import { Connection, createConnection, getMetadataArgsStorage } from 'typeorm';
import { EntityRepositoryMetadataArgs } from 'typeorm/metadata-args/EntityRepositoryMetadataArgs';

import { ProviderTokens } from '../../../common';

export class DatabaseProviders {

  private static providers = [];

  public static getDatabaseProviders() {
    if (this.providers && this.providers.length) { return this.providers; }
    DatabaseProviders.loadRepositories();
    this.providers = [this.getRootConnectionProvider(), ...this.getEntityRepositoriesProviders()];
    return this.providers;
  }

  private static createEntityRepositoryProviders(entityRepository: EntityRepositoryMetadataArgs) {
    return {
      provide: entityRepository.target,
      useFactory: (connection: Connection) => connection.getCustomRepository(entityRepository.target),
      inject: [ ProviderTokens.ROOT_CONNECTION ]
    };
  }

  private static getEntityRepositoriesProviders() {
    const entityRepositoriesProviders = getMetadataArgsStorage().entityRepositories
      .map(this.createEntityRepositoryProviders);
    return entityRepositoriesProviders;
  }

  private static getRootConnectionProvider() {
    return {
      provide: ProviderTokens.ROOT_CONNECTION,
      useFactory: async () => await createConnection()
    };
  }

  private static async loadRepositories() {
    const path = __dirname + '/../**/*.repository.js';
    const files = glob.sync(path);
    files.forEach((file) => {
      try {
        require(file);
      } catch (error) {
        console.log(`Failed to load ${file}`);
      }
    });
  }
}
