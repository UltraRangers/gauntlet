import { Component } from '@nestjs/common';
import { join } from 'path';

@Component()
export class ConfigService {

  public getConfigByFilename(filename: string) {
    let path = this.getConfigPath();
    try {
      path = join(this.getConfigPath(), `${filename}.${process.env.NODE_ENV}`);
      return require(path);
    } catch (error) {
      path = join(this.getConfigPath(), `${filename}`);
      return require(path);
    }
  }

  private getConfigPath(): string {
    return join(process.cwd(), 'config', 'server');
  }
}
