import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import authConfig from './config/authConfig';
import databaseConfig from './config/databaseConfig';
import mailConfig from './config/mailConfig';
import serverConfig from './config/serverConfig';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig, mailConfig, serverConfig],
      isGlobal: true,
      envFilePath: `.env.development`,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    MongooseModule.forRoot(
      `${databaseConfig().database.username}://${databaseConfig().host}:${databaseConfig().port}/${databaseConfig().database.name}`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
