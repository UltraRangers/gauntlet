import { Component } from '@nestjs/common';

import { readdirSync } from 'fs';
import { join } from 'path';
import { Connection, getConnection } from 'typeorm';

@Component()
export class DatabaseService {

  public connection: Connection;

  public constructor() {
    /**
     * Default connection
     *
     * If add a named connection in
     * DB module, add it also here
     */
    this.connection = getConnection();
  }

  public async connect(): Promise<void> {
    if (!this.connection.isConnected) {
      await this.connection.connect();
    }
  }

  public async disconnect() {
    if (this.connection.isConnected) {
      await this.connection.close();
    }
  }

  public async reset() {
    await this.connection.dropDatabase();
    await this.connection.runMigrations();
  }

  public async seed() {
    const seedPath = process.cwd() + '/src/server/app/database/seeds';
    const seedFiles = readdirSync(seedPath);
    const queue = [];

    for (const seedFile of seedFiles) {
      const file = require(join(seedPath, seedFile));
      const key = Object.keys(file)[0];
      queue.push(new file[key]().seed(this.connection));
    }
    try {
      await Promise.all(queue);
    } catch (error) {
      throw error;
    }
  }
}
