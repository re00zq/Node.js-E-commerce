import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
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
    MongooseModule.forRoot('mongodb://localhost:27017'), //  don't forget to isolate it in .env
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
