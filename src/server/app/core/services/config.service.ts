import { Component } from '@nestjs/common';
import { join } from 'path';

@Component()
export class ConfigService {

  private configPath: string;

  constructor() {
    this.configPath = join(process.cwd(), 'config', 'server');
  }

  public getEmailConfig() {
    return require(join(this.configPath, 'email-config.json'));
  }

}
