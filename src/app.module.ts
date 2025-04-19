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
import { APP_FILTER } from '@nestjs/core';

import authConfig from './config/authConfig';
import databaseConfig from './config/databaseConfig';
import mailConfig from './config/mailConfig';
import serverConfig from './config/serverConfig';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ProductModule } from './products/product.module';
import { CategoryModule } from './categories/category.module';
import { CartModule } from './cart/cart.module';
import { JSendExceptionFilter } from './common/filters/jsend-exception.filter'; // Adjust path as needed
import { OrdersModule } from './orders/orders.module';

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
    UsersModule,
    AuthModule,
    MailModule,
    ProductModule,
    CategoryModule,
    CartModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: JSendExceptionFilter,
    },
  ],
})
export class AppModule {}
