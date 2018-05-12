import { Component } from '@nestjs/common';
import { createTransport, Transporter, SendMailOptions } from 'nodemailer';
import { join } from 'path';
import EmailTemplate from 'email-templates';

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

  public async sendMailTemplate(template: string, data, options: SendMailOptions) {
    const emailTemplate = new EmailTemplate({
      message: 'test',
      views: {
        root: join(process.cwd(), 'src', 'server', 'templates')
      }
    });
    console.log(template);
    const html = await emailTemplate.render(template, data);
    options.html = html;
    return this.transporter.sendMail(options);

  }

}
