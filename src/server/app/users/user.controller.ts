import { Body, Controller, Get, Post } from '@nestjs/common';

import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {

  public constructor(private readonly userService: UserService) {}

  @Post('login')
  public async login(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<{ user: User, token: string }> {
    return this.userService.login({email, password});
  }

  @Get()
  public getUsers() {
    return this.userService.getUsers();
  }
}
