import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';
import { JsonWebTokenService } from '..';

@Middleware()
export class AccessTokenMiddleware implements NestMiddleware {

  constructor(
    private jwtService: JsonWebTokenService
  ) { }

  public resolve(...args: any[]): ExpressMiddleware {
    return (request, response, next) => {
      const headers = request.headers;
      const accessToken = headers.accessToken || headers['x-access-token'];
      console.log(accessToken);
      const user = this.jwtService.verify(accessToken);
      if (user) {
        request.user = user;
      }
      next();
    };
  }
}
