import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';

@Guard()
export class AccessTokenGuard implements CanActivate {

  public canActivate(request, context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return request.user ? true : false;
  }
}
