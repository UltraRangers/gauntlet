import { Component, Inject, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';

import { BcryptService, EmailService, JsonWebTokenService } from '../core';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Component()
export class UserService {

  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly jwtService: JsonWebTokenService,
    private readonly bcryptService: BcryptService,
    private readonly emailService: EmailService
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

  public async changePassword(userId: number, data: {
    previousPassword: string,
    newPassword: string
  }): Promise<void> {
    if (!userId || !data.newPassword || !data.previousPassword) {
      throw new BadRequestException();
    }
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    const isValidPassword = await this.bcryptService.compareHash(data.previousPassword, user.password);
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
    await this.emailService.sendMailTemplate(
      'reset-password',
      { name: 'test' },
      {
        to: 'cedrickmandocdoc@gmail.com',
        subject: 'Reset Password'
      }
    );
    // await this.emailService.sendMail({
    //   to: 'cedrickmandocdoc@gmail.com',
    //   subject: 'Reset Passwd',
    //   text: 'Reset Password',
    //   html: `
    //     <p>Click the link below to reset your password.</p>
    //     <p>http://localhost:8080/users/reset/password?token=${token}</p>
    //   `
    // });
    console.log('email sent');
    return;
  }

}
