import { Component, Inject, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { compileFile } from 'pug';
import { join } from 'path';

import { BcryptService, EmailService, JsonWebTokenService, PugService } from '../core';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Component()
export class UserService {

  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly jwtService: JsonWebTokenService,
    private readonly bcryptService: BcryptService,
    private readonly emailService: EmailService,
    private readonly pugService: PugService
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
    const token = this.jwtService.sign(classToPlain(user));
    return { user, token };
  }

  public async updatePassword(userId: number, data: {
    currentPassword: string,
    newPassword: string
  }): Promise<void> {
    if (!userId || !data.newPassword || !data.currentPassword) {
      throw new BadRequestException();
    }
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    const isValidPassword = await this.bcryptService.compareHash(data.currentPassword, user.password);
    if (!isValidPassword) {
      throw new BadRequestException();
    }
    return this.userRepository.updateById(userId, {
      password: await this.bcryptService.hash(data.newPassword)
    });
  }

  public async sendResetPasswordEmail(data: {email: string}): Promise<void> {
    const user = await this.userRepository.getUserByEmail(data.email);
    if (!user) throw new NotFoundException();
    const token = this.jwtService.sign(classToPlain(user));
    const context = {
      user,
      link: `http://localhost:8080/reset-password?token=${token}`
    };
    const html = this.pugService.compileFile(join(process.cwd(), 'src', 'server', 'templates', 'reset-password.pug'), context);
    return this.emailService.sendMail({
      to: 'cedrickmandocdoc@gmail.com',
      subject: 'Reset Password',
      html: html
    });
  }

}
