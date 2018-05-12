import { Component } from '@nestjs/common';
import { join } from 'path';

@Component()
export class ConfigService {

  public getEmailConfig() {
    return require(join(this.getConfigPath(), 'email-config.json'));
  }

  private getConfigPath(): string {
    return join(process.cwd(), 'config', 'server');
  }
}
