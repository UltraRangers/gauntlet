import { Body, Controller, Get, Post, UseGuards, Put } from '@nestjs/common';

import { AccessTokenGuard, CurrentUser } from '../core';

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

  @Get('me')
  @UseGuards(AccessTokenGuard)
  public getMe(
    @CurrentUser() currentUser: User
  ): Promise<User> {
    return this.userService.getUserById(currentUser.id);
  }

  @Get()
  public getUsers() {
    return this.userService.getUsers();
  }

  @Put('profile')
  @UseGuards(AccessTokenGuard)
  public async updateProfile(
    @CurrentUser() currentUser: User,
    @Body() user: User
  ): Promise<User> {
    await this.userService.updateProfileById(currentUser.id, user);
    return this.userService.getUserById(currentUser.id);
  }
}
