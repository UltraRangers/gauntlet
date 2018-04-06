import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('/users')
export class GetUsersController {

  public constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  public async execute() {
    return this.userService.getUsers();
  }
}
