import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';
import { JsonWebTokenService } from '../services/jsonwebtoken.service';

@Middleware()
export class AccessTokenMiddleware implements NestMiddleware {

  constructor(
    private jwtService: JsonWebTokenService
  ) { }

  public resolve(...args: any[]): ExpressMiddleware {
    return (request, response, next) => {
      request.user = this.jwtService.verify(request.headers['X-Access-Token']);
      next();
    };
  }
}
