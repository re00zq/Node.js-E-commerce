import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import serverConfig from '../config/serverConfig';
import { User } from '../users/user.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendToken(user: User, token: string) {
    const url = `${serverConfig().url}/auth/confirm?token=${token}`;
    // console.log(token);

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Topia! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.firstName,
        confirmation_url: url,
      },
    });
  }
}
