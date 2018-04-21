import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AccessTokenMiddleware, CoreModule, VersionMiddleware } from './app/core';

import { UserModule } from './app/users';

@Module({
  imports: [
    CoreModule,
    UserModule
  ],
  components: []
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply([
        AccessTokenMiddleware,
        VersionMiddleware
      ])
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      });
  }
}
