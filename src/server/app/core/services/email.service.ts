import { Component } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { join } from 'path';

import { EmailConfig } from '../../../../common/interfaces/email-config';

@Component()
export class EmailService {

  private config: EmailConfig;
  private transporter: Transporter;

  constructor() {
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
      const configPath = join(process.cwd(), 'config', 'server', 'email-config.js');
      this.config = require(configPath);
    } catch (error) {
      console.log('error loading config');
    }
  }
}
