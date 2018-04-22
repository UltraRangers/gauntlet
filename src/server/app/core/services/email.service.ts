import { Component } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

import { EmailConfig } from '../../../../common/interfaces/email-config';
import { ConfigService } from './config.service';

@Component()
export class EmailService {

  private config: EmailConfig;
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.init();
  }

  public async sendMail(mailOptions: MailOptions) {
    if (!this.transporter || this.config) {
      this.init();
    }
    try {
      mailOptions.from = this.config.auth.user;
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log('failed sending email');
    }
  }

  private init() {
    this.loadEmailConfig();
    this.initTransporter();
  }

  private initTransporter() {
    this.transporter = createTransport(this.config);
  }

  private loadEmailConfig() {
    try {
      this.config = this.configService.getConfigByFilename('email-config');
    } catch (error) {
      console.log('error loading config');
    }
  }
}
