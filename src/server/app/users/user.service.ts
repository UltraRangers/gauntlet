import { Component, Inject, UnauthorizedException } from '@nestjs/common';

import { BcryptService, JsonWebTokenService } from '../core';
import { User, UserRepository } from './';

@Component()
export class UserService {

  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly jwtService: JsonWebTokenService,
    private readonly bcryptService: BcryptService
  ) {}

  public async login(email: string, password: string): Promise<{ user: User, token: string }> {
    const user = await this.userRepository.getUserByEmail(email);
    console.log('user', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordRight = await this.bcryptService.compareHash(password, user.password);
    if (!isPasswordRight) {
      throw new UnauthorizedException();
    }
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      roles: user.roles
    });
    return { user, token };
  }

  public async getUsers() {
    return this.userRepository.getUsers({});
  }
}
