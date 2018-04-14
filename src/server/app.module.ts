import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AccessTokenMiddleware } from './app/core/middlewares/access-token.middleware';

import { UserModule } from './app/users';

@Module({
  imports: [
    UserModule
  ],
  components: []
})
export class AppModule implements NestModule {

  public configure(consumer: MiddlewaresConsumer) {
    consumer
      // .apply((req, res, next) => {
      //   console.log('asdsa111d');
      //   next();
      // })
      .apply([
        (req, res, next) => {
          console.log('test');
          next();
        },
        AccessTokenMiddleware
      ])
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      });
  }
}
