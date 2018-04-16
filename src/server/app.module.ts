import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { VersionMiddleware } from './app/core';

import { UserModule } from './app/users';

@Module({
  imports: [
    UserModule
  ],
  components: []
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply([
        VersionMiddleware
      ])
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      });
  }
}
