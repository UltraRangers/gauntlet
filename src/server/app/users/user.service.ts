import { Component, Inject, UnauthorizedException } from '@nestjs/common';

import { BcryptService, JsonWebTokenService } from '../core';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Component()
export class UserService {

  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly jwtService: JsonWebTokenService,
    private readonly bcryptService: BcryptService
  ) {}

  public async login(data: {email: string, password: string}): Promise<{ user: User, token: string }> {
    const user = await this.userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isValidPassword = await this.bcryptService.compareHash(data.password, user.password);
    if (!isValidPassword) {
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
