// email.module.ts

import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import mailConfig from 'src/config/mailConfig';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: mailConfig().host,
          secure: false,
          port: mailConfig().port, // port for secure SMTP
          auth: {
            user: mailConfig().username,
            pass: mailConfig().password,
          },
        },
        defaults: {
          from: `"Mahmoud Rezq" <${mailConfig().username}>`,
        },
        template: {
          dir: join(__dirname, '../', '../', 'src', 'mail', 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
