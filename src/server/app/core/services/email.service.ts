import { Component } from '@nestjs/common';
import { createTransport, Transporter, SendMailOptions } from 'nodemailer';

import { ConfigService } from './config.service';

@Component()
export class EmailService {

  private config: any;
  private transporter: Transporter;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.config = this.configService.getEmailConfig();
    this.transporter = createTransport(this.config);
  }

  public sendMail(options: SendMailOptions) {
    options.from = this.config.auth.user;
    return this.transporter.sendMail(options);
  }

}
