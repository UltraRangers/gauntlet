import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post('login')
  public login(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<{ user: User, token: string }> {
    return this.userService.login({email, password});
  }

  @Get(':id')
  public getUserById(
    @Param('id') id: number
  ): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get()
  public getUsers() {
    return this.userService.getUsers();
  }
}
