import { Body, Controller, Inject, Get, Post, Param, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';

import { AccessTokenGuard, CurrentUser } from '../core';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {

  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly userService: UserService
  ) {}

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
    return this.userRepository.getUserById(currentUser.id);
  }

  @Get()
  public getUsers(
    @Query('options') options: FindManyOptions<User>
  ) {
    return this.userRepository.getUsers({
      relations: ['roles']
    });
  }

  @Put(':id/password')
  @UseGuards(AccessTokenGuard)
  public updatePassword(
    @Param('id') id: number,
    @Body() data: any
  ) {
    return this.userService.updatePassword(id, data);
  }

  @Post('reset-password')
  public sendResetPasswordEmail(
    @Body() data: any
  ) {
    return this.userService.sendResetPasswordEmail(data);
  }

  @Put('reset-password')
  @UseGuards(AccessTokenGuard)
  public resetPassword(
    @CurrentUser() currentUser: User,
    @Body() data: any
  ) {
    return this.userService.updatePassword(currentUser.id, data);
  }

}
