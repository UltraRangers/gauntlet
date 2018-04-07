import { Component, Inject } from '@nestjs/common';

import { UserRepository } from './user.repository';

@Component()
export class UserService {

  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository
  ) {}

  public async getUsers() {
    return this.userRepository.getUsers({});
  }
}
