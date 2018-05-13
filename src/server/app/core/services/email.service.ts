import { Component } from '@nestjs/common';
import { createTransport, Transporter, SendMailOptions } from 'nodemailer';

import { ConfigService } from './config.service';

@Component()
export class EmailService {

  private emailConfig: any;
  private transporter: Transporter;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.emailConfig = this.configService.getEmailConfig();
    this.transporter = createTransport(this.emailConfig);
  }

  public sendMail(options: SendMailOptions) {
    options.from = this.emailConfig.auth.user;
    return this.transporter.sendMail(options);
  }

}
