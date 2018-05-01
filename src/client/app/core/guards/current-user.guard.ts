import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { User } from '../../../../common/entities';
import { UserService } from '../services/user.service';

@Injectable()
export class CurrentUserGuard implements CanActivate {

  public constructor(
    private userService: UserService,
    private router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.currentUser$.map((user: User) => {
      if (!user) {
        this.router.navigate(['/home']);
      }
      return !!user;
    })
    .take(1);
  }
}
