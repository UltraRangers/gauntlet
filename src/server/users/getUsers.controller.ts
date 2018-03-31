import { Controller, Get, Inject } from '@nestjs/common';

import { ProviderTokens } from '../../common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('/users')
export class GetUsersController {

  constructor(
    private readonly userService: UserService,
    @Inject(ProviderTokens.USER_CONNECTION) private readonly userRepository: UserRepository
  ) {}

  @Get()
  public async execute() {
    const healthCheck = this.userService.healthCheck();
    const users = await this.userRepository.find({});
    console.log('users', users);
    return healthCheck;
  }
}
